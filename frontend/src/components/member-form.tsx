import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { Link2 } from 'lucide-react'
import { users as usersApi } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MemberFormProps {
  name: string
  onChangeName: (value: string) => void
  email: string
  onChangeEmail: (value: string) => void
  linkedUserId: string | null
  onChangeLinkedUserId: (value: string | null) => void
}

export function MemberForm({
  name,
  onChangeName,
  email,
  onChangeEmail,
  linkedUserId,
  onChangeLinkedUserId,
}: MemberFormProps) {
  const { t } = useTranslation()

  // Busca o usuário de forma segura via e-mail sem expor o diretório global
  const trimmedEmail = email.trim()
  const { data: lookupResult, isLoading: isLookingUp } = useQuery({
    queryKey: ['users', 'lookup', trimmedEmail.toLowerCase()],
    queryFn: () => usersApi.lookupByEmail(trimmedEmail),
    enabled: trimmedEmail.length >= 3 && trimmedEmail.includes('@'),
    staleTime: 60_000,
    retry: false,
  })

  // Vincula o ID caso um e-mail correspondente seja localizado
  useEffect(() => {
    if (lookupResult?.id) {
      onChangeLinkedUserId(lookupResult.id)
    } else {
      onChangeLinkedUserId(null)
    }
  }, [lookupResult, onChangeLinkedUserId])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{t('splitGroups.memberEmail')}</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="exemplo@dominio.com"
        />
        {isLookingUp ? (
          <p className="text-xs text-muted-foreground animate-pulse">
            Verificando e-mail...
          </p>
        ) : lookupResult ? (
          <p className="text-xs text-emerald-600 inline-flex items-center gap-1">
            <Link2 size={11} />
            {t('splitGroups.willLinkToUser', { email: lookupResult.email })}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            {t('splitGroups.memberEmailHint')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>{t('splitGroups.memberName')}</Label>
        <Input
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Nome do membro"
        />
      </div>
    </div>
  )
}
