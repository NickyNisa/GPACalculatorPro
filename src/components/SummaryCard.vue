<template>
  <q-card flat bordered class="q-mb-md">
    <q-card-section class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="bg-blue-8 text-white text-center q-pa-sm" flat>
          <q-card-section>
            <div class="text-subtitle1">หน่วยกิตรวม</div>
            <div class="text-h2 text-weight-bold">{{ subjectStore.totalCredits }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="bg-light-blue-5 text-white text-center q-pa-sm" flat>
          <q-card-section>
            <div class="text-subtitle1">เกรดเฉลี่ย (GPA)</div>
            <div class="text-h2 text-weight-bold">{{ subjectStore.semesterGPA.toFixed(2) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useSubjectStore } from '@/stores/subjectStore'

const subjectStore = useSubjectStore()
</script>
