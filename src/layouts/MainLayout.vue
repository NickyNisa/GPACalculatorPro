<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> GPA Calculator </q-toolbar-title>
        <div v-if="authStore.isAuthenticated" class="row items-center q-gutter-sm">
          <q-badge
            :color="authStore.role === 'teacher' ? 'orange' : 'green'"
            class="text-subtitle2 q-pa-sm"
          >
            {{ authStore.user.name }} ({{ authStore.user.role }})
          </q-badge>
          <q-btn flat round icon="logout" @click="handleLogout">
            <q-tooltip>ออกจากระบบ</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth-store'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
