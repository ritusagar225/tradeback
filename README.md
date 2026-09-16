# TradeBack — Personal Trading Review

> **Don't show me all my trades. Tell me what I keep doing.**

TradeBack is a product-management-focused MVP designed to help retail traders review one month of trading activity and identify the **2–3 most impactful behavioural patterns worth reviewing**.

Instead of presenting users with a large trading history or generic analytics, TradeBack converts raw trades into a small number of **evidence-backed, actionable observations**.

---

## Product Overview

Trading platforms typically provide users with extensive transaction history, charts, P&L reports, and statistics.

The problem is that more data does not necessarily answer the question:

**"What am I repeatedly doing that is costing me money?"**

TradeBack focuses on this gap.

The product:

1. Takes a month of trading history.
2. Calculates core trading metrics.
3. Detects repeatable behavioural patterns.
4. Ranks patterns based on financial impact, frequency, confidence, and actionability.
5. Surfaces only the top 2–3 patterns.
6. Shows the exact trades supporting each pattern.
7. Converts an insight into a concrete next-month focus.

---

## Core Product Promise

**Don't show me all my trades. Tell me what I keep doing.**

The experience is intentionally designed around three questions:

### 1. What am I doing repeatedly?

Identify observable patterns across trades.

### 2. Why are you showing me this?

Provide concrete trade-level evidence and measurable financial impact.

### 3. What can I try differently?

Turn the observation into a specific next-month action.

---

## Key Product Decisions

### Evidence over assumptions

TradeBack only surfaces patterns supported by measurable trading data.

The system avoids psychological assumptions and uses neutral, empirical language such as:

- "matched"
- "associated with"
- "accounted for"
- "worth reviewing"

### Restraint when evidence is insufficient

TradeBack does not force an insight when the dataset is too small or when no detector has sufficient evidence.

For example:

**8 trades → "Not enough evidence yet."**

This prevents the product from presenting weak patterns as meaningful conclusions.

### Explainability

Every insight can be traced back to the individual trades that caused it to be surfaced.

Users can move from:

**Insight → Supporting trades → Individual trade details → Action**

### Focus over information overload

Rather than displaying every detected pattern, the ranking engine surfaces only the top 2–3 insights.

---

## Example Insights

The sample dataset demonstrates patterns such as:

### Losing trades stay open longer

Compares the median holding duration of winning and losing trades.

Example:

- Median winning duration: 1h 18m
- Median losing duration: 3h 42m
- Duration ratio: 2.8×

### Losing trades without recorded stop-loss

Identifies losing trades where no stop-loss was recorded.

The user can inspect every supporting trade and see the associated loss impact.

### Position value increases after losses

Compares the position value of a trade with the immediately preceding losing trade.

Position value is calculated as:

```text
position value = entry price × quantity
