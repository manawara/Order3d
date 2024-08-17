import FormLogin from '@/components/Auth/FormLogin'

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-xl sm:text-3xl font-semibold text-center mb-8">Druk 3D zamówienia - logowanie</h1>
      <p className="mb-8">Wprowadź swój adres e-mail i hasło, aby uzyskać dostęp do zamówień.</p>
      <FormLogin />
    </div>
  )
}

export default LoginPage
