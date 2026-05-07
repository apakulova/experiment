import { useMemo, useState } from 'react'
import { CheckCircle2, CreditCard, LockKeyhole, ShieldCheck, Wallet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

const maskCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '')
  if (!digits) return '1234 5678 9012 3456'
  const padded = digits.padEnd(16, '•')
  return padded.replace(/(.{4})/g, '$1 ').trim()
}

export function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('')
  const [cardholder, setCardholder] = useState('ANNA ZAMYSLOVA')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const isReady = cardNumber.replace(/\D/g, '').length === 16 && expiry.length === 5 && cvv.length === 3 && cardholder.trim().length > 3

  const cardBrand = useMemo(() => {
    const digits = cardNumber.replace(/\D/g, '')
    if (digits.startsWith('4')) return 'Visa'
    if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-6]|7[01])/.test(digits)) return 'Mastercard'
    if (digits.startsWith('220')) return 'Mir'
    return 'Bank card'
  }, [cardNumber])

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="flex flex-col justify-between rounded-[30px] border border-[#e6e8eb] bg-white p-6 shadow-[0_20px_50px_rgba(17,24,39,0.06)] sm:p-8">
            <div className="space-y-8">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e6e8eb] bg-[#f6f7f9] px-3 py-1 text-xs font-medium tracking-[0.18em] text-slate-600 uppercase">
                    <span className="h-2 w-2 rounded-full bg-[#00AAFF]" />
                    Checkout
                  </span>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Оплата банковской картой</h1>
                    <p className="max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                      Подтверждение заказа за несколько секунд: карта, защита 3-D Secure и мгновенное зачисление.
                    </p>
                  </div>
                </div>
                <div className="hidden items-center gap-2 rounded-2xl border border-[#e6e8eb] bg-[#f6f7f9] px-3 py-3 sm:flex">
                  <span className="h-3 w-3 rounded-full bg-[#97CF26]" />
                  <span className="h-3 w-3 rounded-full bg-[#FF6163]" />
                  <span className="h-3 w-3 rounded-full bg-[#A169F7]" />
                  <Wallet className="ml-1 h-5 w-5 text-[#00AAFF]" />
                </div>
              </div>

              <Card className="overflow-hidden border-[#e6e8eb] bg-[#fbfbfc] text-slate-950 shadow-none">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b border-[#e6e8eb] px-5 py-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">К оплате</p>
                      <p className="mt-1 text-3xl font-semibold">2 480 ₽</p>
                    </div>
                    <div className="rounded-full bg-[#97CF26]/15 px-3 py-1 text-sm font-medium text-[#527411]">Сегодня</div>
                  </div>

                  <div className="grid gap-4 px-5 py-5 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#e6e8eb] bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Получатель</p>
                      <p className="mt-2 text-base font-medium">Anna Studio</p>
                      <p className="mt-1 text-sm text-slate-500">Дизайн-консультация и материалы</p>
                    </div>
                    <div className="rounded-2xl border border-[#e6e8eb] bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Заказ</p>
                      <p className="mt-2 text-base font-medium">#AZ-240506</p>
                      <p className="mt-1 text-sm text-slate-500">Доступ сразу после оплаты</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="overflow-hidden rounded-[24px] border border-[#e6e8eb] bg-[linear-gradient(135deg,#ffffff_0%,#f7fbff_36%,#fff7fb_68%,#fcfff6_100%)] p-5">
                <div className="mb-5 flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#00AAFF]" />
                  <span className="h-3 w-3 rounded-full bg-[#FF6163]" />
                  <span className="h-3 w-3 rounded-full bg-[#97CF26]" />
                  <span className="h-3 w-3 rounded-full bg-[#A169F7]" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{cardBrand}</p>
                    <p className="text-xl font-medium tracking-[0.18em] text-slate-950 sm:text-2xl">{maskCardNumber(cardNumber)}</p>
                  </div>
                  <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                    <CreditCard className="h-6 w-6 text-[#00AAFF]" />
                  </div>
                </div>

                <div className="mt-10 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Card holder</p>
                    <p className="mt-2 text-sm font-medium uppercase text-slate-900">{cardholder || 'YOUR NAME'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Expires</p>
                    <p className="mt-2 text-sm font-medium text-slate-900">{expiry || 'MM/YY'}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#e6e8eb] bg-[#fbfbfc] p-4">
                  <ShieldCheck className="h-5 w-5 text-[#00AAFF]" />
                  <p className="mt-3 text-sm font-medium text-slate-950">PCI DSS</p>
                  <p className="mt-1 text-sm text-slate-500">Хранение платежных данных отключено</p>
                </div>
                <div className="rounded-2xl border border-[#e6e8eb] bg-[#fbfbfc] p-4">
                  <LockKeyhole className="h-5 w-5 text-[#A169F7]" />
                  <p className="mt-3 text-sm font-medium text-slate-950">3-D Secure</p>
                  <p className="mt-1 text-sm text-slate-500">Дополнительная защита банка</p>
                </div>
                <div className="rounded-2xl border border-[#e6e8eb] bg-[#fbfbfc] p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#97CF26]" />
                  <p className="mt-3 text-sm font-medium text-slate-950">Моментально</p>
                  <p className="mt-1 text-sm text-slate-500">Подтверждение на e-mail и в кабинете</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-[#e6e8eb] bg-white shadow-[0_20px_50px_rgba(17,24,39,0.06)]">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#00AAFF]">Оплата заказа</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Данные карты</h2>
                  <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Все поля проверяются на клиенте. Можно использовать этот экран как основу для checkout-страницы.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#111827] px-4 py-2 text-sm font-medium text-white">2 480 ₽</div>
              </div>

              <form className="space-y-5">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Номер карты</span>
                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-[#f6f7f9] px-4 transition focus-within:border-[#00AAFF] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#00AAFF]/10">
                    <CreditCard className="h-5 w-5 text-[#00AAFF]" />
                    <input
                      className="w-full bg-transparent text-base text-slate-950 outline-none placeholder:text-slate-400"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                    />
                  </div>
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">Срок действия</span>
                    <input
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#f6f7f9] px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00AAFF] focus:bg-white focus:ring-4 focus:ring-[#00AAFF]/10"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-700">CVV / CVC</span>
                    <input
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#f6f7f9] px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00AAFF] focus:bg-white focus:ring-4 focus:ring-[#00AAFF]/10"
                      inputMode="numeric"
                      placeholder="123"
                      value={cvv}
                      onChange={(event) => setCvv(event.target.value.replace(/\D/g, '').slice(0, 3))}
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">Имя держателя</span>
                  <input
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-[#f6f7f9] px-4 text-base uppercase text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00AAFF] focus:bg-white focus:ring-4 focus:ring-[#00AAFF]/10"
                    autoComplete="cc-name"
                    placeholder="IVAN IVANOV"
                    value={cardholder}
                    onChange={(event) => setCardholder(event.target.value.toUpperCase())}
                  />
                </label>

                <div className="rounded-2xl border border-[#e8ecf1] bg-[#f8fafc] p-4 text-sm text-slate-800">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#00AAFF]" />
                    <div className="space-y-1">
                      <p className="font-medium">Платеж защищен</p>
                      <p className="leading-6 text-slate-500">
                        После нажатия кнопки можно показать экран подтверждения банка, код из SMS или статус успешной оплаты.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Button className="h-14 w-full rounded-2xl bg-[#00AAFF] text-base font-medium text-white hover:bg-[#0a9ae7]" size="lg">
                    Оплатить 2 480 ₽
                  </Button>
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <LockKeyhole className="h-4 w-4" />
                      Шифрование TLS
                    </span>
                    <span className={isReady ? 'text-[#2f7a14]' : 'text-[#8a6511]'}>
                      {isReady ? 'Форма готова к отправке' : 'Заполни все обязательные поля'}
                    </span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
