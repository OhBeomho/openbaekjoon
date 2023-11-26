import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const inputProblemNumber = () =>
    vscode.window
      .showInputBox({
        placeHolder: "백준 문제 번호를 입력해 주세요. (ex. 1000)",
        validateInput: (value) => (isNaN(Number(value)) ? "숫자를 입력해 주세요." : undefined)
      })
      .then((value) => Number(value));
  const openBaekjoonPage = (problemNumber: number, type: "problem" | "submit") => {
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(`https://www.acmicpc.net/${type}/${problemNumber}`));
  };

  let openProblem = vscode.commands.registerCommand("openbaekjoon.openProblem", () =>
    inputProblemNumber().then((problemNumber) => problemNumber && openBaekjoonPage(problemNumber, "problem"))
  );
  let openSubmit = vscode.commands.registerCommand("openbaekjoon.openSubmit", () =>
    inputProblemNumber().then((problemNumber) => problemNumber && openBaekjoonPage(problemNumber, "submit"))
  );

  context.subscriptions.push(openProblem, openSubmit);
}

export function deactivate() {}
