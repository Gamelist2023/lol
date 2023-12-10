try {
    async function getSetData(setId) {
        const res = await fetch(`https://quizlet.com/${setId}`);
        const text = await res.text();
        const data = text.match(/\\"termIdToTermsMap\\":{.+?{.+?\\"termSort\\":/gi)?.[0];
        if (!data) throw new Error("セットデータの解析に失敗しました。");
        const parsed = JSON.parse(data.slice(21, -14).replaceAll(`\\"`, "`"));
        return [Object.fromEntries(Object.values(parsed).map(({ word, definition }) => [word, definition])), Object.fromEntries(Object.values(parsed).map(({ word, definition }) => [definition, word]))];
    }

    function getActiveQuestion() {
        try {
            const question = document.querySelector(".StudentPrompt-text").textContent;
            const answers = Array.from(document.querySelectorAll(".StudentAnswerOption-text"));
            return [question, answers];
        } catch { }
        return [null, null];
    }

    (async () => {
        const setId = prompt("セットIDを入力してください。例：123456789", "");
        const [term2Def, def2Term] = await getSetData(setId);
        setInterval(async function () {
            const [question, choices] = getActiveQuestion();
            if (!question || !choices) return;
            if (question in term2Def) {
                choices.forEach((choice) => {
                    if (choice.textContent === term2Def[question]) choice.style.fontWeight = "bolder";
                });
            } else if (question in def2Term) {
                choices.forEach((choice) => {
                    if (choice.textContent === def2Term[question]) choice.style.fontWeight = "bolder";
                });
            } else {
                choices.forEach((choice) => {
                    choice.style.fontWeight = "normal";
                });
            }
        }, 0);
    })();
} catch (err) {
    alert(err);
}
void 0
