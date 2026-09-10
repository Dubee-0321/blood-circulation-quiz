const quizBtn = document.getElementById("quiz-btn");
const mainCard = document.querySelector(".main-card");

// 시작하기 버튼을 눌렀을 때 실행되는 함수
quizBtn.addEventListener("click", function() {
    // 카드 안쪽 내용을 캐릭터 선택 화면으로 변경합니다
    mainCard.innerHTML = `
        <h1>캐릭터를 선택하세요!</h1>
        <div class="char-container">
            <!-- 적혈구 선택 상자 -->
            <div class="char-box" onclick="selectCharacter('적혈구')">
                <svg viewBox="0 0 100 100" class="char-icon">
                    <circle cx="50" cy="50" r="45" fill="#ff4d6d"/>
                    <circle cx="50" cy="50" r="22" fill="#c9184a"/>
                </svg>
                <h3>적혈구</h3>
                <p></p>
            </div>

            <!-- 백혈구 선택 상자 -->
            <div class="char-box" onclick="selectCharacter('백혈구')">
                <svg viewBox="0 0 100 100" class="char-icon">
                    <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#b8c0ff" stroke-width="4"/>
                    <circle cx="38" cy="45" r="12" fill="#7209b7"/>
                    <circle cx="58" cy="55" r="10" fill="#7209b7"/>
                </svg>
                <h3>백혈구</h3>
                <p></p>
            </div>
        </div>
    `;
});

// 캐릭터를 클릭했을 때 실행되는 함수 (소개 화면으로 전환)
function selectCharacter(name) {
    let iconSvg = "";
    let introText = "";

    // 선택한 캐릭터에 따라 그림과 인사말을 다르게 설정합니다.
    if (name === '적혈구') {
        iconSvg = `
            <svg viewBox="0 0 100 100" class="char-icon" style="width: 80px; height: 80px; margin-bottom: 10px;">
                <circle cx="50" cy="50" r="45" fill="#ff4d6d"/>
                <circle cx="50" cy="50" r="22" fill="#c9184a"/>
            </svg>
        `;
        introText = "안녕! 난 적혈구야. 헤모글로빈에 의해 산소를 운반하지 ";
    } else if (name === '백혈구') {
        iconSvg = `
            <svg viewBox="0 0 100 100" class="char-icon" style="width: 80px; height: 80px; margin-bottom: 10px;">
                <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#b8c0ff" stroke-width="4"/>
                <circle cx="38" cy="45" r="12" fill="#7209b7"/>
                <circle cx="58" cy="55" r="10" fill="#7209b7"/>
            </svg>
        `;
        introText = "반가워! 난 백혈구야. 세균이나 바이러스와 같은 외부 침입자로부터 몸을 보호하는 면역 기능을 담당하지. ";
    }

    // 상자 안의 내용을 캐릭터 소개와 게임 방법 화면으로 바꿉니다.
    mainCard.innerHTML = `
        ${iconSvg}
        <h2 style="color: #a4133c; margin-bottom: 15px;">${name}, 준비 완료</h2>
        <p style="color: #4a4a4a; font-size: 17px; margin-bottom: 15px; word-break: keep-all;">${introText}</p>
        
        <div style="background: #fff5f7; border-radius: 15px; padding: 15px; margin-bottom: 25px;">
            <p style="color: #a4133c; font-weight: bold; margin-bottom: 8px;">게임 방법</p>
            <p style="color: #555; font-size: 15px; line-height: 1.5; margin: 0; word-break: keep-all;">
                지금부터 심장을 출발해서 몸속 여러 기관들을 지나갈 거야.<br>
                각 장소에서 나오는 퀴즈에 정답을 답해야 다음 목적지로 갈 수 있어
                만약 틀린 답을 고른다면, 심혈관계 질환 하나에 대한 정보가 나올거야.
                질환 세개가 쌓인다면 게임 오버!
                혈액 순환이 잘 진행될 수 있도록 도와줄래?
            </p>
        </div>
        
        <button id="start-journey-btn">출발하기</button>
    `;

    // '출발하기!' 버튼을 누르면 실행될 다음 단계 준비 (지금은 알림창만 띄움)
    document.getElementById("start-journey-btn").addEventListener("click", function() {
        alert("이제 첫 번째 퀴즈 화면으로 넘어갈 차례입니다!");
    });
}
