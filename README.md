# TiltFlow (가칭)

스마트폰 **기울기 센서**로 UI가 반응하는 인터랙티브 웹 체험입니다. Vue 3 + Vite로 구현했으며 [Netlify](https://www.netlify.com/) 등 HTTPS 환경에 배포하는 것을 권장합니다.

## 기능 (MVP)

- 랜딩 → **시작하기** 클릭 후에만 센서 권한 요청 (iOS Safari 대응)
- **세로**: 메뉴 안내 / **가로**: 중력 볼 인터랙션
- `gamma`·`beta` 기반 기울기, 스무딩 및 ±30 범위 제한
- 권한 거부 시 **터치 패드**로 기울기 대체
- PC 접속 시 안내 화면 (`?mobile=1` 쿼리로 모바일 플로우 테스트 가능)

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

`netlify.toml`에 SPA 리다이렉트가 포함되어 있습니다.

## 저장소

<https://github.com/Ninano9/tilt-flow>
