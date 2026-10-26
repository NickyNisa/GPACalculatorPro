<template>
  <q-card flat bordered>
    <q-card-section>
      <q-form ref="myForm" class="q-gutter-md">
        <q-input
          v-model="form.name"
          label="ชื่อวิชา"
          filled
          :rules="[(val) => !!val || 'กรุณากรอกชื่อวิชา']"
        />

        <q-input
          v-model.number="form.credit"
          type="number"
          label="หน่วยกิต"
          filled
          :rules="[
            (val) => (val !== null && val !== '') || 'กรุณากรอกหน่วยกิต',
            (val) => (val > 0 && val <= 10) || 'หน่วยกิตต้องอยู่ระหว่าง 1-10',
          ]"
        />

        <q-input
          v-model.number="form.score"
          type="number"
          label="คะแนน (0-100)"
          filled
          :rules="[
            (val) => (val !== null && val !== '') || 'กรุณากรอกคะแนน',
            (val) => (val >= 0 && val <= 100) || 'คะแนนต้องอยู่ระหว่าง 0-100',
          ]"
        />

        <q-input v-model="previewGrade" label="เกรดที่ได้ (พรีวิว)" filled readonly />

        <q-btn
          :ripple="false"
          color="primary"
          label="เพิ่มรายวิชา"
          class="full-width"
          @click="submitForm"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useSubjectStore } from '../stores/subjectStore'

const subjectStore = useSubjectStore()
const myForm = ref(null)

const form = ref({
  name: '',
  credit: 0,
  score: 0,
})

const previewGrade = ref('')

const calculateGrade = (score) => {
  if (score >= 80) return { grade: 'A', point: 4.0 }
  if (score >= 75) return { grade: 'B+', point: 3.5 }
  if (score >= 70) return { grade: 'B', point: 3.0 }
  if (score >= 65) return { grade: 'C+', point: 2.5 }
  if (score >= 60) return { grade: 'C', point: 2.0 }
  if (score >= 55) return { grade: 'D+', point: 1.5 }
  if (score >= 50) return { grade: 'D', point: 1.0 }
  return { grade: 'E', point: 0 }
}

watch(
  () => [form.value.score, form.value.credit],
  ([newScore]) => {
    if (newScore !== null && newScore >= 0 && newScore <= 100) {
      const { grade } = calculateGrade(newScore)
      previewGrade.value = newScore > 0 || form.value.credit > 0 ? grade : ''
    } else {
      previewGrade.value = ''
    }
  },
)

const submitForm = () => {
  if (myForm.value) {
    myForm.value.validate().then(async (success) => {
      if (success) {
        const { grade, point } = calculateGrade(form.value.score)

        await subjectStore.addSubject({
          name: form.value.name,
          credit: Number(form.value.credit),
          score: Number(form.value.score),
          grade,
          point,
        })

        form.value = { name: '', credit: 0, score: 0 }
        previewGrade.value = ''

        await nextTick()
        myForm.value.resetValidation()
      }
    })
  }
}
</script>
