import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/boot/axios'

export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const fetchSubjects = async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
      const response = await api.get('/subjects')
      subjects.value = response.data
    } catch (error) {
      errorMessage.value = error.message
      console.error('Fetch Error:', error)
    } finally {
      isLoading.value = false
    }
  }

  const addSubject = async (newSubject) => {
    try {
      const response = await api.post('/subjects', newSubject)
      subjects.value.push(response.data)
    } catch (error) {
      console.error('Create Error:', error)
    }
  }

  const updateSubject = async (id, updatedData) => {
    try {
      const response = await api.put(`/subjects/${id}`, updatedData)
      const index = subjects.value.findIndex((sub) => sub.id === id)
      if (index !== -1) subjects.value[index] = response.data
    } catch (error) {
      console.error('Update Error:', error)
    }
  }

  const deleteSubject = async (id) => {
    try {
      await api.delete(`/subjects/${id}`)
      subjects.value = subjects.value.filter((sub) => sub.id !== id)
    } catch (error) {
      console.error('Delete Error:', error)
    }
  }

  const clearAllSubjects = async () => {
    for (const sub of subjects.value) {
      await deleteSubject(sub.id)
    }
  }

  const totalCredits = computed(() => {
    return subjects.value.reduce((sum, sub) => sum + Number(sub.credit), 0)
  })

  const semesterGPA = computed(() => {
    if (totalCredits.value === 0) return 0

    const totalPoints = subjects.value.reduce((sum, sub) => {
      let point = 0
      if (sub.score >= 80) point = 4.0
      else if (sub.score >= 75) point = 3.5
      else if (sub.score >= 70) point = 3.0
      else if (sub.score >= 65) point = 2.5
      else if (sub.score >= 60) point = 2.0
      else if (sub.score >= 55) point = 1.5
      else if (sub.score >= 50) point = 1.0
      return sum + point * Number(sub.credit)
    }, 0)
    return totalPoints / totalCredits.value
  })

  return {
    subjects,
    isLoading,
    errorMessage,
    fetchSubjects,
    addSubject,
    updateSubject,
    deleteSubject,
    clearAllSubjects,
    totalCredits,
    semesterGPA,
  }
})
