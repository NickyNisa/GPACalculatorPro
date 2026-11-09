<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2" style="width: 100%; max-width: 400px; border-radius: 12px">
      <q-card-section class="text-center">
        <q-icon name="calculate" size="50px" color="primary" />
        <div class="text-h5 text-weight-bold q-mt-sm">GPA Pro</div>
        <div class="text-caption text-grey">Student GPA Calculator</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleLogin" class="q-gutter-md">
          <q-input
            outlined
            v-model="username"
            label="Username"
            :rules="[(val) => !!val || 'กรุณากรอก Username']"
          />
          <q-input
            outlined
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            :rules="[(val) => !!val || 'กรุณากรอก Password']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            color="primary"
            class="full-width q-mt-sm"
            label="LOGIN"
            icon-right="login"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center text-grey-7 bg-grey-1 q-mt-md" style="border-radius: 8px">
        <div class="text-weight-bold">Demo Account</div>
        <div>Username: student/teacher</div>
        <div>Password: 123456</div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="showErrorDialog">
      <q-card style="min-width: 320px; border-radius: 8px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 flex items-center">
            <q-icon name="error" color="negative" size="28px" class="q-mr-sm" />
            Login Failed
          </div>
        </q-card-section>

        <q-card-section class="q-pt-md text-body1">
          Username หรือ Password ไม่ถูกต้อง
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()
const showErrorDialog = ref(false)
const isPwd = ref(true)

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value)
    router.push('/')
  } catch (error) {
    showErrorDialog.value = true
    console.error('เข้าสู่ระบบไม่สำเร็จ:', error)
  }
}
</script>
