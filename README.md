# 자꾸다꾸(Jakudaque)



![Image](https://github.com/user-attachments/assets/c18af3a6-4faf-44c0-af3e-4a25ade65dce)
<br>

- **배포링크 :** https://jakudacque.netlify.app/

- **테스트계정(사용자) :** 

<table>
  <tr>
    <td align="left"><b>Id</b></td>
    <td align="right">u1@market.com</td>
  </tr>
  <tr>
    <td align="left"><b>Password</b></td>
    <td align="right">11111111</td>
  </tr>
</table>
<br>

#### [노션](https://www.notion.so/3-3-c26a9f29db16456da7a40f983920cd87?pvs=21) | [피그마](https://www.figma.com/design/EbDG1LJlB9nCGJV2I7qCbi/%ED%8C%8C%EC%9D%B4%EB%84%90-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=94-25&p=f&t=6pmBplsXpIKsLZoh-0) | [요구사항명세서](https://www.notion.so/16d60fdbf8b181748245fa8ab837e7f1?pvs=21)
<br>

## 목차


- [프로젝트 소개](#1-프로젝트-소개)
- [팀원 소개](#2-팀원-소개)
- [개발 환경](#3-개발-환경)
- [담당 기능](#4-담당-기능)
- [주요 기능](#5-주요-기능)
<br><br>
## 1. 프로젝트 소개


자꾸다꾸는 다이어리 꾸미기(다꾸)가 취미인 사람들을 위해 다이어리와 다이어리 꾸미기 용품을 전문적으로 취급하는 다꾸 전문 쇼핑몰입니다.
<br><br>

## 2. 팀원 소개


<table align="center">
  <tbody>
    <tr>
      <td>
        <img src="https://github.com/user-attachments/assets/bbba14a5-11c2-48fb-a5cc-e93b15b4c343" width="200px" height="200px" style="object-fit: cover;" />
      </td>
      <td>
        <img src="https://github.com/user-attachments/assets/25a911c0-712d-4208-8aff-4d801e782c5d" width="200px" height="200px" style="object-fit: cover;" />
      </td>
      <td>
        <img src="https://github.com/user-attachments/assets/c1e2f151-a423-4d0b-902b-6632c0d44698" width="200px" height="200px" style="object-fit: cover;" />
      </td>
      <td>
        <img src="https://github.com/user-attachments/assets/07850877-e2e9-4136-92a4-4daa410b1ab5" width="200px" height="200px" style="object-fit: cover;" />
      </td>
    </tr>
    <tr align="center">
      <td>
        <sub><b>강수정 </b><a href="https://github.com/kangsujung614">(@kangsujung614)</a></sub>
      </td>
      <td>
        <sub><b>김영동 </b><a href="https://github.com/kim-young-dong">(@kim-young-dong)</a></sub>
      </td>
      <td>
        <sub><b>안시은 </b><a href="https://github.com/Ansinnn">(@Ansinnn)</a></sub>
      </td>
      <td>
        <sub><b>차유태 </b><a href="https://github.com/Chayoutae">(@Chayoutae)</a></sub>
      </td>
    </tr>
  </tbody>
</table>
<br><br>

## 3. 개발 환경


- **Front-end** : HTML, TailwindCSS(tailwind-styled-component), React, Zustand
- **Back-end** : 제공된 오픈마켓 API 활용
- **버전 및 이슈관리** : Github, Github Issues, Github Project
- **협업 툴** : Discord, Notion
- **서비스 배포 환경** : Netlify
- **디자인** : figma
<br><br>
## 4. 담당 기능


- **강수정**    
    [상품 상세]  
    [마이페이지]  
    [찜 기능]  
    [공통] 
    - 푸터
    - 모달
    - 탑 버튼

- **김영동**  
    [관리자 페이지]  
    - 대시보드
    - 상품 관리
    - 주문 관리
    - 회원 목록
      
- **안시은**  
    [로그인/ 회원가입]   
    [메인홈]  
    [장바구니]
      
- **차유태**  
    [상품 리스트 페이지]  
    [검색 페이지]  
    [고객상담]  
    [공통]
    - 카테고리  
<br><br>
## 5. 주요 기능

### 로그인/회원가입

- 이메일 로그인/회원가입
- 카카오 로그인/회원가입
- 로그아웃

### 상품 리스트 페이지

- 상품 목록 조회
- 상품 검색
- 상품 정렬

### 상품 상세페이지

- 상품 상세 조회
- 단일 상품 구매

### 찜 기능

- 상품 찜 등록/삭제

### 장바구니 기능

- 장바구니 추가
- 장바구니 조회
- 장바구니 상품 수량변경/삭제
- 구매한 상품 장바구니에서 삭제

### 마이페이지

- 주문 내역 조회
- 찜 내역 조회
- 회원 정보 수정

### 고객상담

- 채널톡을 활용한 1대1 상담

### 관리자 페이지

- 일일 주문량 차트 노출
- 상품 정보 CRUD
- 주문 정보 확인 및 주문 상태 변경
- 상품 카테고리 CRUD
- 회원 목록 확인 및 특정 회원 검색
