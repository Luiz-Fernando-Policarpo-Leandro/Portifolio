# Guia de Estilo - Portfólio Luiz Fernando

## 🎨 Paleta - Ciano com Harmonia Tripla

### Hierarquia de Cores

#### 1. Ciano (PRIMÁRIO - 60%)
- `--accent-cyan`: #06b6d4
- `--accent-cyan-light`: #67e8f9
- `--accent-cyan-dark`: #0891b2
- `--accent-cyan-glow`: rgba(6, 182, 212, 0.3)

**Papel:** Cor dominante, aparece em todos elementos de destaque

#### 2. Verde Esmeralda (SECUNDÁRIO - 30%)
- `--matrix-green`: #10b981
- `--matrix-green-light`: #34d399
- `--matrix-green-dark`: #059669
- `--matrix-green-glow`: rgba(16, 185, 129, 0.2)

**Papel:** Aparece junto com ciano, mais fraco, cria harmonia

#### 3. Azul Petróleo/Teal (TERCIÁRIO - 10%)
- `--accent-teal`: #14b8a6
- `--accent-teal-light`: #5eead4
- `--accent-teal-glow`: rgba(20, 184, 166, 0.15)

**Papel:** Conecta ciano e verde, profundidade, aparece mais fraco

---

## 🎯 Gradientes Triplos

### Gradiente Principal
```css
linear-gradient(135deg, 
  var(--accent-cyan) 0%,      /* Ciano domina */
  var(--accent-teal) 50%,     /* Teal no meio */
  var(--matrix-green) 100%    /* Verde fecha */
)
```

### Gradiente Texto
```css
linear-gradient(135deg, 
  #ffffff 0%, 
  var(--accent-cyan-light) 50%, 
  var(--accent-teal-light) 100%
)
```

---

## 📍 Aplicações

### Ciano Predomina (60%)
- ✅ Navbar brand
- ✅ Links hover
- ✅ Títulos (h1, h2)
- ✅ Stat numbers (gradiente)
- ✅ Skill boxes
- ✅ Timeline
- ✅ Footer
- ✅ Cursor
- ✅ Avatar ring (gradiente)
- ✅ Botões hover
- ✅ Cards hover
- ✅ Badges hover

### Verde Aparece Fraco (30%)
- ✅ Gradientes (fechando)
- ✅ Avatar ring
- ✅ Detalhes em hover
- ✅ Matrix background

### Azul Petróleo Conecta (10%)
- ✅ Meio dos gradientes
- ✅ Sombras suaves
- ✅ Transições de cor
- ✅ Profundidade

---

## ✨ Efeitos

### Glow Triplo
- Ciano: 0.3 opacity (forte)
- Teal: 0.15 opacity (fraco)
- Verde: 0.2 opacity (médio)

### Gradientes
- Sempre 3 cores
- Ciano sempre primeiro (domina)
- Teal no meio (conecta)
- Verde sempre depois (fecha)

### Sombras
- Baseadas em ciano
- Toque de teal
- Verde só no background

---

## 💡 Princípios

1. **Ciano Domina** - Sempre visível primeiro
2. **Verde Complementa** - Aparece junto, mais fraco
3. **Azul Conecta** - No meio, faz transição
4. **Nunca Sozinho** - Sempre em gradiente triplo
5. **Hierarquia Clara** - 60% / 30% / 10%

---

## 📁 Estrutura

- `assets/styles.css` - CSS completo
- `index.html` - HTML
- `CORES.md` - Este guia
