<script setup>
import { t } from '../i18n'
import ReactIsland from '../react/ReactIsland.vue'
import StageCtaIsland from '../react/StageCtaIsland.jsx'
</script>

<template>
  <section id="contato" class="cta-wrap container">
    <ReactIsland
      :component="StageCtaIsland"
      :props="{
        badge: t('cta.badge'),
        title: t('cta.title'),
        text: t('cta.text'),
        primaryLabel: t('cta.b1'),
        secondaryLabel: t('cta.b2'),
        corridorsLabel: t('cta.corridorsLabel'),
        steps: t('cta.steps'),
        metrics: t('cta.metrics'),
      }"
    />
  </section>
</template>

<style>
.cta-wrap {
  padding-top: clamp(28px, 4vw, 48px);
  padding-bottom: clamp(32px, 5vw, 56px);
}
.stage-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: clamp(28px, 4.5vw, 52px);
  background:
    radial-gradient(120% 100% at 0% 0%, rgba(217, 142, 104, 0.18) 0%, rgba(22, 23, 31, 0.92) 52%, rgba(12, 13, 18, 0.98) 100%);
  border: 1px solid rgba(217, 142, 104, 0.35);
  box-shadow:
    0 30px 80px -20px rgba(0, 0, 0, 0.85),
    0 0 60px -12px rgba(217, 142, 104, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
.stage-card__mesh {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 36px 36px;
  mask-image: radial-gradient(ellipse 80% 70% at 80% 20%, #000 20%, transparent 75%);
}
.stage-card__halo {
  position: absolute; right: -120px; bottom: -140px; width: 420px; height: 420px;
  border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, rgba(217, 142, 104, 0.28) 0%, transparent 70%);
  filter: blur(30px);
}
.stage-card__grid {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: clamp(28px, 4vw, 48px);
  align-items: center;
}
.stage-card__pitch {
  display: flex; flex-direction: column; align-items: flex-start; gap: 18px;
}
.stage-card__badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 14px; border-radius: 999px;
  background: rgba(217, 142, 104, 0.12);
  border: 1px solid rgba(217, 142, 104, 0.32);
  font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
}
.stage-card__badge i {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--ok); box-shadow: 0 0 8px var(--ok);
}
.stage-card__title {
  margin: 0;
  font-size: clamp(26px, 3.4vw, 38px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 600;
  color: #f8fafc;
}
.stage-card__sub {
  margin: 0;
  font-size: 15.5px; line-height: 1.6; font-weight: 400; color: var(--muted);
  max-width: 520px;
}
.stage-card__actions {
  display: flex; flex-wrap: wrap; align-items: center; gap: 16px;
  padding-top: 6px;
}
.stage-card__steps {
  display: flex; flex-wrap: wrap; gap: 10px 22px;
  padding-top: 12px; margin: 0;
  border-top: 1px solid var(--line);
  width: 100%;
  font-size: 13px; color: var(--muted);
}
.stage-card__steps li {
  display: inline-flex; align-items: center; gap: 7px;
}
.stage-card__check {
  color: var(--accent); font-weight: 600;
}
.stage-card__telemetry {
  padding: 22px;
  border-radius: 20px;
  background: rgba(10, 11, 16, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  display: flex; flex-direction: column; gap: 16px;
}
.stage-card__tel-head {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
  padding-bottom: 12px; border-bottom: 1px solid var(--line);
  font-size: 13px; font-weight: 500; color: var(--text-2);
}
.stage-card__live {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--ok); font-weight: 600;
}
.stage-card__live i {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--ok); box-shadow: 0 0 8px var(--ok);
}
.stage-card__routes {
  display: flex; flex-direction: column; gap: 10px;
}
.stage-card__route {
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
  padding: 11px 14px; border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid var(--line);
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.stage-card__route:hover {
  border-color: rgba(217, 142, 104, 0.35);
  transform: translateX(3px);
}
.stage-card__route div {
  display: flex; flex-direction: column; gap: 2px;
}
.stage-card__route small {
  font-size: 10.5px; color: var(--accent-soft); letter-spacing: 0.06em;
}
.stage-card__route strong {
  font-size: 13px; font-weight: 600; color: #fff;
}
.stage-card__pill {
  padding: 4px 9px; border-radius: 6px;
  background: rgba(217, 142, 104, 0.14);
  color: var(--accent); font-size: 11px; font-weight: 600; white-space: nowrap;
}
.stage-card__metrics {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  padding-top: 12px; margin: 0; border-top: 1px solid var(--line);
}
.stage-card__metrics div {
  display: flex; flex-direction: column; gap: 3px;
}
.stage-card__metrics dt {
  font-size: 9.5px; color: var(--dim); letter-spacing: 0.08em;
}
.stage-card__metrics dd {
  margin: 0; font-size: 11.5px; font-weight: 600; color: var(--text-2);
}
@media (max-width: 900px) {
  .stage-card__grid { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .stage-card__metrics { grid-template-columns: 1fr; }
}
</style>
