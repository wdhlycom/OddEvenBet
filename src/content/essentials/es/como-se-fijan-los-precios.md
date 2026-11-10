---
title: "Cómo se fijan los precios en los mercados de predicción"
description: "El precio sale del libro de órdenes, no de un oráculo. Creadores y tomadores, de dónde sale el spread y por qué 0,65 $ es «65% probable», no un pago."
question: "¿Cómo se fijan los precios en los mercados de predicción?"
answer: "Los precios los fijan las órdenes limitadas del libro de órdenes, no un oráculo. Y un precio de 0,65 $ significa que el mercado cree que el evento es un 65% probable — es una probabilidad, no un múltiplo de pago."
topic: "betting-basics"
lang: "es"
updated: 2026-11-05
author: "Equipo editorial"
related:
  - "como-funcionan-los-mercados-de-prediccion"
  - "que-es-la-liquidez"
order: 4
draft: false
---

En un mercado de predicción no hay ningún oráculo que anuncie «esto es un 62% probable». Solo hay una larga lista de órdenes. El precio medio es el punto donde se cruzan la mejor compra y la mejor venta.

Y lo que ese precio *significa* es justo donde más se confunden los principiantes. Este artículo aclara dos cosas a la vez: **de dónde sale el precio** y **qué dice realmente el precio**.

## De dónde sale el precio: tres tipos de personas

| Participante | Qué hace | Qué gana |
|---|---|---|
| Creador | Publica una orden limitada y espera | El spread, a veces un reembolso |
| Tomador | Se come el spread, ejecuta al instante | Nada — paga el spread |
| Arbitrajista | Compara precios externos, corrige la brecha | La brecha, si es lo bastante rápido |

## Por qué existe el spread

Un <details class="term"><summary>creador de mercado</summary><span class="term-note">Alguien que publica cotizaciones continuamente en ambos lados y se queda con el spread — su presencia mantiene líquido el mercado.</span></details> que cotiza 0,60 / 0,62 dice: compraré a 0,60 y venderé a 0,62. Entre una ejecución y otra, carga con el riesgo de «mantener inventario». El <details class="term"><summary>spread</summary><span class="term-note">La distancia entre la compra y la venta — el coste que pagas en el instante de entrar y de salir.</span></details> de 2 céntimos que hay en medio es su compensación por «quizá estar equivocado». En un contrato que cotiza cerca de 0,50 $, un spread de 2 céntimos es un 4% de tu capital — ya grande en relación con la ventaja que la mayoría de los operadores minoristas realmente tienen.

## Qué dice el precio: no es un múltiplo de pago

El malentendido más común en este espacio es tratar el precio como un pago. **No lo es. El precio es una probabilidad.** Son dos cosas distintas, y confundirlas es exactamente por qué los principiantes pierden dinero en eventos que «acertaron correctamente».

Un contrato se liquida a 1 $ o 0 $. Si el precio de mercado es 0,65 $, el mercado dice que el evento tiene aproximadamente un 65% de probabilidad de ocurrir. La correspondencia es uno a uno:

- 0,65 $ = 65%
- 0,30 $ = 30%
- 0,98 $ = 98%

Nada más. El precio no es un múltiplo de pago, no es una tasa de retorno. Es la estimación colectiva de probabilidad del mercado, expresada en dólares.

## Por qué 0,90 $ no es «seguro»

Imagina que compras «Sí» a 0,90 $. ¿Qué pasa?

- **Ganas**: el contrato se liquida a 1 $. Arriesgaste 0,90 $ para ganar **0,10 $** — alrededor de un 11%.
- **Pierdes**: el contrato se liquida a 0 $. Pierdes los **0,90 $** enteros.

Ahora pregúntate qué significa «seguro». Un precio de 0,90 $ significa un 10% de probabilidad de perderlo todo. De cada cien posiciones así, diez lo pierden todo. Si apuestas todo tu patrimonio neto a algo «seguro al 90%», el único fallo de cada diez te arruina — mientras que cada una de las nueve victorias te paga 11 céntimos.

## La perspectiva del valor esperado

Si compras al precio *p* y la probabilidad real es exactamente *p*, tu retorno esperado es cero, menos las comisiones. Solo ganas dinero cuando **crees que la probabilidad real es mayor que el precio de mercado**. Todo el juego es un desacuerdo sobre la probabilidad, no una apuesta sobre el resultado.

Si compras a 0,65 $ creyendo que la probabilidad real es del 75%, tu ventaja es de 10 puntos — pero aun así perderás el 25% de las veces. La ventaja rinde a lo largo de muchas operaciones, nunca en una sola.

## Los mercados poco líquidos siguen mal valorados más tiempo

La liquidez no se reparte por igual. Un mercado electoral puede absorber una orden de seis cifras sin que el precio se mueva. Un mercado de nicho — por ejemplo, un único fallo judicial o un anuncio corporativo — puede tener un solo creador de mercado publicando un spread de 10 céntimos. En mercados así, el precio refleja «el inventario de una persona», no «el juicio de una multitud».

Esa es la forma más común en que los principiantes pierden en «apuestas seguras»: no se equivocaron en el resultado, pero el spread se comió toda su ventaja.

## Una regla práctica

Antes de comprar cualquier contrato, apunta dos números:

1. **Cuál creo que es la probabilidad real.**
2. **Cuál es el precio de mercado.**

Si tu número no es claramente superior al precio, la operación no se sostiene — por muy «obvio» que parezca el resultado. La mayoría de la gente se salta por completo el paso uno, que es exactamente por qué la mayoría pierde.

## Lo que esta página debe dejarte

1. El precio sale del libro de órdenes, fijado en conjunto por creadores, tomadores y arbitrajistas.
2. Precio = probabilidad, no un múltiplo de pago.
3. Un «favorito» a 0,90 $ sigue teniendo un 10% de probabilidad de arruinarte.
4. Solo tienes ventaja cuando tu probabilidad estimada está por encima del precio de mercado.
5. Apuesta solo el dinero que puedas permitirte perder.

Siguiente: [¿Qué es la liquidez?](/es/essentials/que-es-la-liquidez)
