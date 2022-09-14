# 🏖 오늘의 바다

![image](https://user-images.githubusercontent.com/82587107/190138745-568a416b-0fd5-4088-a28a-be4719a5f881.png)
![image](https://user-images.githubusercontent.com/82587107/190138721-a696c9ee-be5e-4351-877c-320978831720.png)

오늘의 바다는 전국의 해수욕장 날씨와 바다 상황을 조회할 수 있는 서비스입니다.

아래 링크를 통해 확인해보실 수 있습니다.

🔗 https://github.com/yujleee/today-sea

### 설명

- 공공데이터 오픈 API인 기상청의 전국 해수욕장 날씨 조회 서비스를 이용했습니다.
  - https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15102239
- 일출일몰, 조석조회는 여름철(6~8월)에만 가능합니다.

<br/>

## 💻 기술 스택

`HTML` `SCSS` `JavaScript` `Webpack`

- SCSS를 통해 CSS를 효율적으로 구성하고 작성했습니다.
- 다른 프레임워크,라이브러리 없이 순수하게 자바스크립트로만 기능을 구현했습니다.
- 웹팩으로 빌드하여 Github Pages 를 통해 배포했습니다.

<br/>

## 🗂 디렉토리 구조

```
📦assets
📦favicon
📦js
📦styles
┣ 📂base
┣ 📂components
┣ 📂constants
┣ 📂mixins
┗ 📜main.scss
┣ 📜_error.html
┣ 📜_index.html
┗ 📜_info.html
```

### 설명

- assets
  - 이미지, 해수욕장 목록 JSON 파일이 있는 디렉토리
- favicon
  - 파비콘 관련 파일들 디렉토리
- js
  - 검색, 로컬 스토리지 관련, 오픈API를 통해 데이터를 받아오는 등등 js 파일 디렉토리
- styles
  - SCSS 파일 디렉토리
  - 기본적인 환경설정, 컴포넌트, 변수, 믹스인 등으로 디렉토리 구조화
- html 파일들

<br/>

## 기능 시연

추가 예정

<br/>

## 상세 기능

추가 예정

<br/>

## 트러블 슈팅 및 기록

추가 예정
