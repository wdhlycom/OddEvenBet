---
title: "Cómo funcionan las comisiones de los mercados de predicción"
description: "Las comisiones golpean al tomador, no al creador, y alcanzan su pico cerca de 0,50 $. Aquí la fórmula, el spread y su efecto en tu ventaja."
question: "¿Cómo se calculan las comisiones de los mercados de predicción?"
answer: "Hay dos costes: la comisión del tomador (cobrada por la plataforma) y el spread (cobrado por el mercado). La comisión del tomador alcanza su pico cerca del 50% de probabilidad, y el spread suele ser el coste mayor y más ignorado."
topic: "betting-basics"
lang: "es"
updated: 2026-11-04
author: "Equipo editorial"
related:
  - "como-se-fijan-los-precios"
  - "que-es-la-liquidez"
order: 6
draft: false
---

Las comisiones en un mercado de predicción son de dos tipos y debes tratarlas por separado: la **comisión del tomador** (cobrada por la plataforma) y el **spread** (cobrado por el propio mercado). Los principiantes suelen ver solo la primera y no ven la segunda — aunque la segunda suele ser el coste mayor.

## La comisión del tomador: por qué alcanza su pico cerca del 50%

En los mercados nativos de cripto, la comisión se calcula normalmente así:

```
comisión = acciones × tasa × precio × (1 − precio)
```

El término `precio × (1 − precio)` es una parábola. Vale 0 cuando el precio es 0 o 1, y alcanza su máximo de 0,25 en 0,50 $. Así que la comisión es máxima cuando el mercado está más incierto y mínima cuando el resultado está casi decidido.

La intuición también se cumple: cuando todos coinciden en el resultado (precio cerca de 0 o 1), hay poca información nueva que emparejar, así que la plataforma cobra menos; cuando el mercado es un cara a cara 50/50, emparejar es caro y la comisión es alta.

## Los creadores no pagan nada, y a veces reciben un reembolso

Si publicas una orden limitada y dejas que otro opere contra ella, eres el creador. La mayoría de las plataformas no cobran nada a los creadores e incluso pagan un pequeño reembolso, porque tu orden es lo que da liquidez al mercado.

Por eso esta estructura de comisiones es, en la práctica, «explotar» a un pequeño grupo de creadores de mercado para mantenerlos en línea — y por eso «todos somos traders» es un mito. La posición por defecto realmente barata es *aportar* liquidez, lo que exige cargar con el riesgo de inventario y, normalmente, escribir código.

## El spread: el coste que todos olvidan

El spread es la brecha entre el precio al que puedes comprar y el precio al que puedes vender. Si la mejor compra es 0,59 $ y la mejor venta 0,61 $, el spread es 0,02 $.

En un contrato de 0,60 $, un spread de 0,02 $ significa que pierdes cerca de un **3,3%** de tu capital en el instante de entrar, porque vender de inmediato solo te da 0,59. Un viaje de ida y vuelta paga el spread dos veces: una al entrar y otra al salir.

Para una operación corta con una ventaja pequeña, solo el spread puede superar todo tu beneficio esperado.

## Qué significa esto para tu ventaja

Suma la comisión del tomador y el spread y pregúntate: ¿mi juicio de probabilidad me da una ventaja que supera ambos costes? En un contrato de 0,60 $, un spread de 2 céntimos más una comisión de 1 céntimo significa que tu coste de ida y vuelta ronda el 4–5%. Si tu ventaja es solo de 2 o 3 puntos, estás pagando al mercado para que opere en tu contra.

Una conclusión incómoda: la mayoría de los operadores manuales, en mercados de precio medio y horizonte corto, van estructuralmente por detrás antes incluso de colocar la orden. La curva de comisiones y el spread no son fricción que puedas ignorar — *son* el juego.

Siguiente: [Cómo funcionan los retiros de los mercados de predicción](/es/essentials/como-funcionan-los-retiros)
