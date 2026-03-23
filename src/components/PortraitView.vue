<template>
  <div class="portrait">
    <div class="glass panel">
      <h2 class="title">메뉴</h2>
      <p class="lead">가로로 돌리면 인터랙션 모드입니다.</p>
    </div>
  </div>
</template>

<style scoped>
.portrait {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.panel {
  width: min(100%, 380px);
  padding: 32px 24px;
  text-align: center;
}

.title {
  margin: 0 0 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.lead {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.55);
}
</style>
