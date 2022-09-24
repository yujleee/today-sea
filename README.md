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
- 프레임워크 없이 바닐라 자바스크립트로 기능을 구현했습니다.
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

## 👀 기능 시연

| 검색                                                                                                                                  | 검색어 컨트롤                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ![오늘의바다-모바일](https://user-images.githubusercontent.com/82587107/191970663-b671198c-eedc-4ec1-8ae0-9e6e0b6d055d.gif) | ![오늘의바다-키보드](https://user-images.githubusercontent.com/82587107/192080083-4de34325-1653-4863-bfee-3e3e04b94d06.gif) |

| 유효성 검사                                                                                                                             | 안내 팝업                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ![검색어-유효성검사](https://user-images.githubusercontent.com/82587107/190955718-31aec4a8-7af8-4ad9-907f-a8c54cadc840.gif) | ![오늘의바다-안내팝업](https://user-images.githubusercontent.com/82587107/191968242-400710e2-de48-4d7f-a762-f7aebd1fa2ae.gif) |

<br/>

## 📍 상세 기능

위키 페이지에서 상세 기능을 살펴볼 수 있습니다.

https://github.com/yujleee/today-sea/wiki

<br/>

## 👾 에러 발생 기록

#### 🗂 등록된 이슈

https://github.com/yujleee/today-sea/issues/1#issue-1370995281

#### ✨ 해결 과정

- 에러 수정 삽질 기록 (1)

  - https://i-ten.tistory.com/185

- 에러 수정 삽질 기록 (2)

  - https://i-ten.tistory.com/186

- 에러 수정 삽질 기록 (3)
  - https://i-ten.tistory.com/187
