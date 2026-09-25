interface ShellLogoProps {
  size?: number
  className?: string
}

export function ShellLogo({ size = 24, className }: ShellLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      // 1. Atualizado para o espaço de coordenadas correto do novo design
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://w3.org"
      className={className}
    >
      {/* 
        2. Mantemos fill="currentColor" para permitir estilização via CSS,
           mas adicionamos as regras de vazamento e o novo desenho.
      */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60,0 C93.14,0 120,26.86 120,60 C120,93.14 93.14,120 60,120 C26.86,120 0,93.14 0,60 C0,26.86 26.86,0 60,0 Z M60,10 C87.61,10 110,32.39 110,60 C110,87.61 87.61,110 60,110 C32.39,110 10,87.61 10,60 C10,32.39 32.39,10 60,10 Z M60,18 C34.5,18 18,34.5 18,60 C18,80.5 31.5,95.5 50.5,99.5 C54.5,100.5 58.5,101 62.5,101 C83.5,101 101,83.5 101,62.5 C101,38 84.5,18 60,18 Z M60,32 C73.25,32 84,42.75 84,56 C84,58.2 82.2,60 80,60 C77.8,60 76,58.2 76,56 C76,47.16 68.84,40 60,40 C51.16,40 44,47.16 44,56 L44,82 C44,83.5 43,84 41,84 L36,84 C34,84 34,83 34,81 L34,79 C36,79 36,78.5 36,77 L36,56 C36,42.75 46.75,32 60,32 Z M60,53 C63.86,53 67,56.14 67,60 C67,63.86 63.86,67 60,67 C56.14,67 53,63.86 53,60 C53,56.14 56.14,53 60,53 Z"
      />
    </svg>
  )
}
