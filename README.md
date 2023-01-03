# 득근득근 복근곰마켓 🐻‍❄️

[🔗 복근곰마켓 바로가기](https://bokgungom-market.netlify.app/)

## 💪 프로젝트 소개

- 💪 복근곰 마켓 서비스는 운동을 즐기는 사람들을 위한 SNS입니다.
- 🏋️ 운동과 관련한 상품들을 업로드하여 판매할 수 있습니다.
- 🏞️ 상품을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있습니다.
- ✏️ 글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유하고 운동 인증을 할 수도 있습니다.
- ❤️ 다른 사용자를 팔로우하여 소식을 공유할 수 있고 댓글과 좋아요를 통해 소통할 수 있습니다.

<br>

- 프로젝트 개발 기간: 2022-12-07 ~ 2023-01-04

<br>

## 🫂 팀 소개

- 멋쟁이사자처럼 프론트엔드 스쿨 3기 프로젝트 15조 `15조는 리액트를 찢오`입니다.


|<span style="font-size:16px">정수현</span>|<span style="font-size:16px">강세민</span>|<span style="font-size:16px">김성준</span>|<span style="font-size:16px">한혜지</span>|
|:-:|:-:|:-:|:-:|
|<a href="https://github.com/sasha1107"><img src="https://avatars.githubusercontent.com/sasha1107" height=100 width=100></a>|<a href="https://github.com/SEMINSEMINSEMIN"><img src="https://avatars.githubusercontent.com/SEMINSEMINSEMIN" height=100 width=100></a>|<a href="https://github.com/sjkymy"><img src="https://avatars.githubusercontent.com/sjkymy" height=100 width=100></a>|<a href="https://github.com/hyejee0504"><img src="https://avatars.githubusercontent.com/hyejee0504" height=100 width=100></a>|

<br>

## ⚙️ 개발 환경

<table>
      <thead align="center">
        <tr>
          <th colspan="2" style="text-align:center;"><span style="font-size:16px;">프론트엔드</span></th>
          <th style="text-align:center;"><span style="font-size:16px">백엔드</span></th>
          <th style="text-align:center;"><span style="font-size:16px">배포</span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center" style="text-align:center;">
            <a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1579667701/noticon/basd2y5bygpkqjiixuqy.png" alt="React" height="50" /></a>
            <br>
            <code>React</code>
          </td>
          <td align="center" style="text-align:center; margin: 0 auto;">
            <a href="https://styled-components.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/styled-components.png" alt="Styled Components" height="50" /></a>
            <br>
            <code>styled-components</code>
          </td>
          <td style="text-align:center;">제공된 API 사용</td>
          <td align="center" style="text-align:center;">
            <a href="https://www.netlify.com/" target="_blank"><img style="margin: 10px" src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1569039210/noticon/yubwjrkj43jpneajrdii.png" alt="Styled Components" height="50" /></a>
            <br>
            <code>Netlify</code>
          </td>
        </tr>
      </tbody>
</table>
<br>

### modules
|모듈명|용도|
|-|-|
|react-router-dom|페이지 라우팅을 위해 사용|
|axios|서버와 통신을 위해 사용|
|react-intersection-observer| 무한 스크롤 구현을 위해 사용 |
|styled-reset| 스타일 구현의 편리를 위해 사용 |
|uuid| 컴포넌트 리스트의 유니크한 key 생성을 위해 사용 |

<br>

## 📊 버전 & 프로젝트 진행 상황 관리

- [🔘 GitHub Issues](https://github.com/orgs/nailedReact/projects/1/views/1)
- [🗂️ GitHub Projects](https://github.com/orgs/nailedReact/projects/1/views/1)

<br>

## 🔀 브랜치 전략

### 👍 GitHub Flow 전략

- 개발과 동시에 지속적으로 배포를 진행할 것이 아니라, 기능을 모두 개발하고 최종적으로 배포를 할 예정이었기 때문에 Git Flow 전략보다는 GitHub Flow 전략이 적합하다고 생각했습니다.
- 프로젝트 기간 동안 팀원들이 같은 시간에 작업하기 때문에 잦은 충돌이 발생할 것을 우려하여 충돌의 크기를 줄이고자 GitHub Flow 전략을 채택하여 작은 단위로 이슈를 쪼개 이슈 별로 브랜치를 분기하고 main 브랜치에 지속적으로 merge 하는 방식으로 진행했습니다.

### 🚀 GitHub Action - 브랜치 생성 자동화
- [Create Issue Branch](https://github.com/marketplace/actions/create-issue-branch)
- 이슈를 생성하면 GitHub Action으로 해당 이슈에 해당하는 브랜치가 자동으로 생성되도록 설정하여 브랜치명을 고민하고 브랜치를 생성하는 시간을 줄였습니다.
    - [브랜치 자동화 설정 내용](https://github.com/nailedReact/react-app/wiki/%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%9E%90%EB%8F%99%ED%99%94-%EC%84%A4%EC%A0%95-%EB%82%B4%EC%9A%A9)
    - [브랜치 history](https://github.com/nailedReact/react-app/blob/main/preview/git%20branch%20history.png)

<br>

## 컨벤션

팀원 간의 원활한 소통과 협업을 위해 커밋 컨벤션과, 코드 컨벤션을 만들어 이를 따랐습니다.


### [🔗 커밋 컨벤션](https://github.com/nailedReact/bokgungom-market/wiki/%EC%BB%A4%EB%B0%8B-%EC%BB%A8%EB%B2%A4%EC%85%98)
- 다양한 사례를 참고하여 프로젝트에서 주로 쓰일 것 같은 커밋 유형을 간추려 컨벤션으로 지정했습니다.


### [🔗 코드 컨벤션](https://github.com/nailedReact/bokgungom-market/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)
- 리액트 코딩에 주로 쓰이는 컨벤션을 참고하여 저희 조만의 코드 컨벤션을 만들었습니다.
- 문자열 처리 시 쌍따옴표/홑따옴표의 사용, 혹은 문장 끝 세미콜론의 사용여부와 같은 개인적 취향이 반영될 수 있는 항목들의 경우에는 사전 설문을 통해 다수결에 따라 지정했습니다. 

<br>

## 페이지 미리보기

<table width="100%">
<tr>
    <th colspan="2">스플래시 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    스플래시(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    스플래시(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EC%8A%A4%ED%94%8C%EB%9E%98%EC%8B%9C-%ED%8E%98%EC%9D%B4%EC%A7%80"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%8B%9C_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EC%8A%A4%ED%94%8C%EB%9E%98%EC%8B%9C-%ED%8E%98%EC%9D%B4%EC%A7%80"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%8B%9C_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">회원가입 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    회원가입(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    회원가입(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EC%8A%A4%ED%94%8C%EB%9E%98%EC%8B%9C_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">로그인 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    로그인(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    로그인(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%9D%B8"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EB%A1%9C%EA%B7%B8%EC%9D%B8_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%9D%B8"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%EB%A1%9C%EA%B7%B8%EC%9D%B8_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">홈 피드 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    홈 피드(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    홈 피드(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%99%88-%ED%94%BC%EB%93%9C"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%ED%94%BC%EB%93%9C_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%99%88-%ED%94%BC%EB%93%9C"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%ED%94%BC%EB%93%9C_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>


<tr>
    <th colspan="2">게시글 상세 보기 + 댓글 페이지 </th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    게시글 상세 보기 + 댓글(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    게시글 상세 보기 + 댓글(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%83%81%EC%84%B8-%EB%B3%B4%EA%B8%B0--%EB%8C%93%EA%B8%80"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%83%81%EC%84%B8%EB%8C%93%EA%B8%80_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%83%81%EC%84%B8-%EB%B3%B4%EA%B8%B0--%EB%8C%93%EA%B8%80"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%83%81%EC%84%B8%EB%8C%93%EA%B8%80_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">게시글 업로드 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    게시글 업로드(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    게시글 업로드(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%97%85%EB%A1%9C%EB%93%9C"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%9E%91%EC%84%B1_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EA%B2%8C%EC%8B%9C%EA%B8%80-%EC%97%85%EB%A1%9C%EB%93%9C"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%EA%B2%8C%EC%8B%9C%EA%B8%80%EC%9E%91%EC%84%B1_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">상품 업로드 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    상품 업로드(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    상품 업로드(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%97%85%EB%A1%9C%EB%93%9C"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EC%83%81%ED%92%88%EC%97%85%EB%A1%9C%EB%93%9C_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%97%85%EB%A1%9C%EB%93%9C"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%EC%83%81%ED%92%88%EC%97%85%EB%A1%9C%EB%93%9C_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">검색 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    검색(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    검색(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EA%B2%80%EC%83%89"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EA%B2%80%EC%83%89_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EA%B2%80%EC%83%89"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%EA%B2%80%EC%83%89_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>


<tr>
    <th colspan="2">프로필 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    프로필(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    프로필(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%ED%94%84%EB%A1%9C%ED%95%84_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%ED%94%84%EB%A1%9C%ED%95%84_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">프로필 수정 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    프로필 수정(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    프로필 수정(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84-%EC%88%98%EC%A0%95"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%ED%94%84%EB%A1%9C%ED%95%84%EC%88%98%EC%A0%95_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84-%EC%88%98%EC%A0%95"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%ED%94%84%EB%A1%9C%ED%95%84%EC%88%98%EC%A0%95_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">로그아웃 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    로그아웃(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    로그아웃(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">채팅 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    채팅(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    채팅(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EC%B1%84%ED%8C%85"><img src="https://github.com/nailedReact/react-app/blob/main/preview/%EC%B1%84%ED%8C%85_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#%EC%B1%84%ED%8C%85"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/%EC%B1%84%ED%8C%85_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

<tr>
    <th colspan="2">404 페이지</th>
</tr>

<tr align="center">
    <td valign="top" width="66%">
    404(데스크탑 🖥️)
    </td>
    <td valign="top" width="33%">
    404(모바일 📱)
    </td>
</tr>

<tr>
    <td valign="top" width="75%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#404"><img src="https://github.com/nailedReact/react-app/blob/main/preview/404_%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-min.gif"/></a>
    </td>
    <td valign="top" width="25%">
    <a href="https://github.com/nailedReact/react-app/wiki/%EB%B3%B5%EA%B7%BC%EA%B3%B0%EB%A7%88%EC%BC%93-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EB%AA%85#404"><img width="220px" src="https://github.com/nailedReact/react-app/blob/main/preview/404_%EB%AA%A8%EB%B0%94%EC%9D%BC-min.gif"/></a>
    </td>
</tr>

</table>

## 추가기능 구현 부분

### 1. 페이지 네이션, 무한 스크롤, 더보기 버튼, 다양한 방식의 UX 디자인 구현
- 홈 피드에서 페이지 네이션 구현

- 개인 프로필내 피드를 무한 스크롤로 구현

- 댓글 부분을 더보기 버튼으로 구현

### 2. 예외 처리 구현 
- 개인 피드가 없을 경우 

- 업로드 오류로 인한 이미지가 없을 경우

- 

### 3. 
