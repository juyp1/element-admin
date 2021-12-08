import i18n from '@/i18n'
const formRules = {
  username: [
    {
      required: true,
      message: i18n.t('msg.login.usernameRule'),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: i18n.t('msg.login.passwordRule'),
      trigger: 'blur'
    }
  ]
}
export default formRules
