<template>
  <q-card flat bordered class="q-mb-md">
    <q-card-section>
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6 text-weight-bold">รายชื่อวิชา ({{ subjectStore.subjects.length }})</div>
        <q-btn
          v-if="subjectStore.subjects.length > 0 && !subjectStore.isLoading"
          color="negative"
          outline
          icon="delete_sweep"
          label="ลบทั้งหมด"
          size="sm"
          @click="subjectStore.clearAllSubjects"
        />
      </div>

      <div v-if="subjectStore.isLoading" class="text-center q-pa-lg">
        <q-spinner-dots color="primary" size="50px" />
        <div class="text-grey-6 q-mt-md">กำลังโหลดข้อมูลรายวิชา...</div>
      </div>

      <div v-else-if="subjectStore.errorMessage" class="q-pa-md">
        <q-banner rounded class="bg-red-1 text-negative border-red">
          <template v-slot:avatar>
            <q-icon name="error" color="negative" />
          </template>
          <strong>เกิดข้อผิดพลาด:</strong> {{ subjectStore.errorMessage }}
        </q-banner>
      </div>

      <div
        v-else-if="subjectStore.subjects.length === 0"
        class="text-center q-pa-lg bg-grey-1 rounded-borders"
      >
        <q-icon name="list_alt" size="50px" color="grey-4" />
        <div class="text-grey-6 q-mt-sm">ยังไม่มีข้อมูลวิชาที่เพิ่มเข้ามา</div>
      </div>

      <q-list v-else separator class="rounded-borders border-grey">
        <q-item v-for="subject in subjectStore.subjects" :key="subject.id" class="q-py-md">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" class="text-weight-bold">
              {{ subject.grade }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold text-subtitle1">{{ subject.name }}</q-item-label>
            <q-item-label caption class="text-grey-7">
              หน่วยกิต: {{ subject.credit }} | คะแนน: {{ subject.score }}
            </q-item-label>
          </q-item-section>

          <q-item-section side class="row">
            <q-btn flat round color="warning" icon="edit" @click="openEditDialog(subject)">
              <q-tooltip>แก้ไขวิชานี้</q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="subjectStore.deleteSubject(subject.id)"
            >
              <q-tooltip>ลบวิชานี้</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-dialog v-model="isEditDialogOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">แก้ไขรายวิชา</div>
        </q-card-section>

        <q-card-section class="q-pt-md q-gutter-md">
          <q-input v-model="editForm.name" label="ชื่อวิชา" filled autofocus />
          <q-input v-model.number="editForm.credit" type="number" label="หน่วยกิต" filled />
          <q-input v-model.number="editForm.score" type="number" label="คะแนน (0-100)" filled />
        </q-card-section>

        <q-card-actions align="right" class="text-primary q-pb-md q-pr-md">
          <q-btn flat label="ยกเลิก" color="grey-7" v-close-popup />
          <q-btn color="primary" label="บันทึกการแก้ไข" @click="saveEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useSubjectStore } from '../stores/subjectStore'

const subjectStore = useSubjectStore()

const isEditDialogOpen = ref(false)
const editForm = ref({
  id: null,
  name: '',
  credit: 0,
  score: 0,
})

const openEditDialog = (subject) => {
  editForm.value = { ...subject }
  isEditDialogOpen.value = true
}

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

const saveEdit = async () => {
  const { grade, point } = calculateGrade(editForm.value.score)

  const updatedData = {
    name: editForm.value.name,
    credit: Number(editForm.value.credit),
    score: Number(editForm.value.score),
    grade,
    point,
  }

  await subjectStore.updateSubject(editForm.value.id, updatedData)
  isEditDialogOpen.value = false
}
</script>
