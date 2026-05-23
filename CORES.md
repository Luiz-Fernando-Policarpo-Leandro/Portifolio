# Guia de Cores - Portfólio Luiz Fernando

## Paleta Atualizada

### Cores Base (Verde Matrix)
- `--matrix-green`: #00ff41 (verde principal)
- `--matrix-green-light`: #33ff6e (verde claro)
- `--matrix-green-dark`: #00cc33 (verde escuro)
- `--matrix-green-deeper`: #008f2e (verde mais profundo)
- `--matrix-green-dim`: rgba(0, 255, 65, 0.15) (verde translúcido)
- `--matrix-green-glow`: rgba(0, 255, 65, 0.3) (brilho verde)
- `--matrix-green-border`: rgba(0, 255, 65, 0.25) (bordas verdes)

### Accent: Coral Queimado (Complementar)
- `--accent-coral`: #c7826c (cor principal)
- `--accent-coral-light`: #d49a85 (variação clara)
- `--accent-coral-dim`: rgba(199, 130, 108, 0.12) (translúcido)

> **Uso:** Cursor de digitação, detalhes de destaque, elementos que precisam de contraste com o verde

### Accent: Dourado Fosco (Sofisticação)
- `--accent-gold`: #b89657 (dourado principal)
- `--accent-gold-light`: #c9a96e (dourado claro)
- `--accent-gold-dim`: rgba(184, 150, 87, 0.1) (translúcido)

> **Uso:** Títulos, ícones, bordas, botões, elementos de navegação, hover states

### Neutros Quentes
- `--warm-gray`: #8b8a7f (cinza quente)
- `--warm-light`: #a8a79d (cinza claro quente)
- `--off-white`: #f5f5f0 (branco sujo)

### Textos
- `--text-primary`: #e5e7eb (texto principal)
- `--text-muted`: #9ca3af (texto secundário)
- `--text-subtle`: #6b7280 (texto sutil)

### Backgrounds
- `--bg-deep`: #0a0a0a (fundo profundo)
- `--bg-surface`: rgba(20, 20, 18, 0.6) (superfície)
- `--bg-surface-hover`: rgba(30, 30, 26, 0.8) (hover)

---

## Teoria das Cores Aplicada

### 1. **Contraste Complementar**
O coral (#c7826c) é complementar ao verde, criando tensão visual sem exagero.

### 2. **Analogia Quente**
O dourado (#b89657) é análogo ao verde no espectro, trazendo harmonia.

### 3. **Neutros Quentes**
Cinzas quentes (#8b8a7f) quebram a frieza do preto puro, criando profundidade.

### 4. **Regra 60-30-10**
- 60% Neutros (preto, cinza, off-white)
- 30% Verde (cor primária)
- 10% Accent (dourado/coral - destaque)

---

## Onde Cada Cor é Usada

### Dourado (Accent Principal)
- ✅ Títulos de seções
- ✅ Logo da navbar
- ✅ Links de navegação
- ✅ Ícones e badges
- ✅ Bordas de cards
- ✅ Hover states
- ✅ Botões
- ✅ Timeline
- ✅ Rodapé

### Coral (Accent Secundário)
- ✅ Cursor de digitação
- ✅ Detalhes sutis de destaque
- ✅ Elementos que precisam de contraste

### Verde (Cor Base)
- ✅ Efeitos de brilho (glow)
- ✅ Backgrounds temáticos
- ✅ Gradientes combinados
- ✅ Matrix background

### Neutros
- ✅ Textos
- ✅ Backgrounds
- ✅ Preenchimento de espaços

---

## Dicas de Uso

1. **Não usar coral e verde juntos em grandes áreas** - o coral é apenas para detalhes
2. **Manter hierarquia** - dourado para elementos primários, verde para secundários
3. **Evitar colorir demais** - a base continua sendo preto/cinza
4. **Usar gradientes** - combinar dourado com verde cria sofisticação
5. **Respeitar a proporção** - 90% neutros + verde, 10% accents

---

## Arquivos Modificados
- `assets/styles.css` - Todas as variáveis e aplicações de cor

## Como Manter

Ao adicionar novos elementos:
1. Use as variáveis CSS existentes
2. Siga a regra 60-30-10
3. Prefira dourado para elementos de destaque
4. Use verde apenas para efeitos específicos
5. Mantenha a base neutra
