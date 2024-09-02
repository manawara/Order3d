import React from 'react'
import FormRegister from '@/components/Auth/FormRegister'

const RegisterPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center mb-8">Druk 3D - Rejestracja</h1>
      <p className="mb-8">Wprowadź swoje dane aby móc się zarejestrować.</p>
      <FormRegister />
    </div>
  )
}

export default RegisterPage
