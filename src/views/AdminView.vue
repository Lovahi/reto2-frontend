<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { eventService } from '@/services/eventService'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'

const loading = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.clearAuth()
  router.push('/')
}
const successMsg = ref('')
const errorMsg = ref('')

const tiposEventos = [
  { label: 'Presentación', value: 'Presentación' },
  { label: 'Charla', value: 'Charla' },
  { label: 'Taller', value: 'Taller' },
]

const form = ref({
  title: '',
  type: null,
  date: null,
  hour: '',
  availablePlaces: 10,
  description: '',
  image: '',
})

const imagePreview = ref('')
const selectedFile = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
      form.value.image = file.name
    }
    reader.readAsDataURL(file)
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    type: null,
    date: null,
    hour: '',
    availablePlaces: 10,
    description: '',
    image: '',
  }
  imagePreview.value = ''
  selectedFile.value = null
}

const clearImage = () => {
  imagePreview.value = ''
  form.value.image = ''
  selectedFile.value = null
}

const handleSubmit = async () => {
  loading.value = true
  successMsg.value = ''
  errorMsg.value = ''

  try {
    // Validaciones básicas
    if (!form.value.title || !form.value.type || !form.value.date || !form.value.description) {
      throw new Error('Por favor, rellena todos los campos obligatorios.')
    }

    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('type', form.value.type.value)
    formData.append('date', new Date(form.value.date).toISOString().split('T')[0])
    formData.append('hour', form.value.hour)
    formData.append('availablePlaces', form.value.availablePlaces)
    formData.append('description', form.value.description)

    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    } else {
      formData.append('image', form.value.image || 'default_event.png')
    }

    await eventService.createEvent(formData)
    successMsg.value = '¡Evento creado con éxito!'
    resetForm()
  } catch (error) {
    errorMsg.value = error.message || 'Error al crear el evento.'
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto p-4 md:p-10 pt-24 md:pt-40 text-(--text-main)">
    <div class="max-w-3xl mx-auto">
      <!-- Encabezado -->
      <div class="flex items-center gap-4 mb-10">
        <div
          class="w-12 h-12 bg-(--primary) rounded-2xl flex items-center justify-center shadow-lg"
        >
          <i class="pi pi-shield text-black text-xl"></i>
        </div>
        <div>
          <h1 class="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">
            Panel de <span class="text-(--primary)">Administración</span>
          </h1>
          <p class="text-(--text-muted) text-xs font-bold uppercase tracking-widest">
            Gestión interna y creación de eventos
          </p>
        </div>
        <div class="ml-auto">
          <Button
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            severity="danger"
            variant="text"
            class="rounded-xl! font-black! uppercase! text-[10px]! tracking-widest! text-(--text-muted)! hover:text-red-500!"
            @click="handleLogout"
          />
        </div>
      </div>

      <!-- Formulario de Creación -->
      <div
        class="bg-(--surface) backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-(--border-color) shadow-2xl relative overflow-hidden"
      >
        <div class="relative z-10">
          <h2
            class="text-xl font-black italic uppercase text-(--primary) mb-8 flex items-center gap-3"
          >
            <i class="pi pi-plus-circle"></i> Crear Nuevo Evento
          </h2>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Título -->
            <div class="flex flex-col gap-2">
              <label
                class="text-[10px] font-black uppercase tracking-widest text-(--text-muted) px-1"
                >Título del Evento</label
              >
              <InputText
                v-model="form.title"
                placeholder="Ej: Gran Torneo de Valorant"
                class="custom-input"
                required
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Tipo -->
              <div class="flex flex-col gap-2">
                <label
                  class="text-[10px] font-black uppercase tracking-widest text-(--text-muted) px-1"
                  >Categoría</label
                >
                <Select
                  v-model="form.type"
                  :options="tiposEventos"
                  optionLabel="label"
                  placeholder="Selecciona tipo"
                  class="custom-select-admin"
                  required
                />
              </div>

              <!-- Fecha -->
              <div class="flex flex-col gap-2">
                <label
                  class="text-[10px] font-black uppercase tracking-widest text-(--text-muted) px-1"
                  >Fecha</label
                >
                <DatePicker
                  v-model="form.date"
                  dateFormat="yy-mm-dd"
                  placeholder="Selecciona fecha"
                  showIcon
                  iconDisplay="input"
                  class="custom-datepicker-admin"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Hora -->
              <div class="flex flex-col gap-2">
                <label
                  class="text-[10px] font-black uppercase tracking-widest text-(--text-muted) px-1"
                  >Hora (HH:MM)</label
                >
                <InputText v-model="form.hour" placeholder="18:30" class="custom-input" required />
              </div>

              <!-- Plazas -->
              <div class="flex flex-col gap-2">
                <label
                  class="text-[10px] font-black uppercase tracking-widest text-(--text-muted) px-1"
                  >Plazas Disponibles</label
                >
                <InputNumber
                  v-model="form.availablePlaces"
                  showButtons
                  :min="1"
                  inputClass="custom-input"
                  class="w-full"
                />
              </div>
            </div>

            <!-- Imagen -->
            <div class="flex flex-col gap-2">
              <label
                class="text-[10px] font-black uppercase tracking-widest text-(--text-muted) px-1"
                >Imagen del Evento</label
              >
              <div class="relative">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="custom-file-input"
                />
                <div v-if="imagePreview" class="mt-4 relative">
                  <img
                    :src="imagePreview"
                    alt="Preview"
                    class="w-full h-48 object-cover rounded-xl border border-(--border-color)"
                  />
                  <button
                    type="button"
                    @click="clearImage"
                    class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    <i class="pi pi-times text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Descripción -->
            <div class="flex flex-col gap-2">
              <label
                class="text-[10px] font-black uppercase tracking-widest text-(--text-muted) px-1"
                >Descripción</label
              >
              <Textarea
                v-model="form.description"
                rows="4"
                placeholder="Describe los detalles del evento..."
                class="custom-input resize-none"
                required
              />
            </div>

            <!-- Feedback -->
            <Transition name="fade">
              <Message
                v-if="successMsg"
                severity="success"
                class="rounded-xl border border-green-500/20 bg-green-500/10 text-green-500 font-bold"
              >
                {{ successMsg }}
              </Message>
            </Transition>
            <Transition name="fade">
              <Message
                v-if="errorMsg"
                severity="error"
                class="rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 font-bold"
              >
                {{ errorMsg }}
              </Message>
            </Transition>

            <!-- Botones -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="submit"
                :loading="loading"
                label="Publicar Evento"
                icon="pi pi-check"
                class="flex-1 bg-(--primary)! text-black! font-black! uppercase! italic! tracking-tighter! py-4! rounded-2xl! hover:scale-[1.02]! transition-all! shadow-xl!"
              />
              <Button
                type="button"
                label="Limpiar Formulario"
                icon="pi pi-refresh"
                @click="resetForm"
                class="bg-transparent! border! border-(--border-color)! text-(--text-muted)! font-bold! uppercase! text-[10px]! px-6! rounded-2xl! hover:bg-(--surface-2)!"
              />
            </div>
          </form>
        </div>

        <!-- Decoración de fondo -->
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-(--primary)/5 blur-[100px] rounded-full pointer-events-none"
        ></div>
        <div
          class="absolute -bottom-24 -left-24 w-48 h-48 bg-(--secondary)/5 blur-[80px] rounded-full pointer-events-none"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-input {
  width: 100% !important;
  background: var(--surface-2) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 1rem !important;
  padding: 0.85rem 1.25rem !important;
  color: var(--text-main) !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
}

.custom-input:focus {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary), transparent 80%) !important;
}

.custom-file-input {
  width: 100% !important;
  background: var(--surface-2) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 1rem !important;
  padding: 0.85rem 1.25rem !important;
  color: var(--text-main) !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
}

.custom-file-input:hover {
  border-color: var(--primary) !important;
}

.custom-file-input::file-selector-button {
  background: var(--primary) !important;
  color: black !important;
  border: none !important;
  padding: 0.5rem 1rem !important;
  border-radius: 0.75rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  font-size: 0.7rem !important;
  cursor: pointer !important;
  margin-right: 1rem !important;
  transition: all 0.2s ease !important;
}

.custom-file-input::file-selector-button:hover {
  background: white !important;
  transform: scale(1.05) !important;
}

:deep(.custom-select-admin),
:deep(.custom-datepicker-admin) {
  width: 100% !important;
  background: var(--surface-2) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 1rem !important;
  height: 3.2rem !important;
}

:deep(.p-select-label),
:deep(.p-datepicker-input) {
  background: transparent !important;
  border: none !important;
  padding: 0.85rem 1.25rem !important;
  font-size: 0.85rem !important;
  color: var(--text-main) !important;
}

:deep(.p-datepicker-input-icon) {
  right: 1.25rem !important;
  color: var(--primary) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
