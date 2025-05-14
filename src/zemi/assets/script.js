let importantIndex = 1;
let todoIndex = 1;

function addImportantRow() {
  const table = document.getElementById("important-table");
  const row = table.insertRow(-1);
  row.innerHTML = `
    <td><input type="checkbox" name="important_done[${importantIndex}]"></td>
    <td><input type="text" name="important[${importantIndex}]"></td>
    <td><input type="text" name="important_tag[${importantIndex}]"></td>
    <td><button type="button" onclick="removeRow(this)">削除</button></td>
  `;
  importantIndex++;
}

function addTodoRow() {
  const table = document.getElementById("todo-table");
  const row = table.insertRow(-1);
  let monthOptions = '', dayOptions = '';
  for (let m = 1; m <= 12; m++) {
    monthOptions += `<option value="${m}">${m}</option>`;
  }
  for (let d = 1; d <= 31; d++) {
    dayOptions += `<option value="${d}">${d}</option>`;
  }

  row.innerHTML = `
    <td><input type="checkbox" name="todos_done[${todoIndex}]"></td>
    <td><input type="text" name="todos[${todoIndex}]"></td>
    <td>
      <select name="todos_status[${todoIndex}]">
        <option value="">選択なし</option>
        <option value="完了">完了</option>
        <option value="進行中">進行中</option>
        <option value="未着手">未着手</option>
      </select>
    </td>
    <td style="white-space: nowrap;">
      <select name="todos_month[${todoIndex}]" style="width: 60px; display: inline-block;">${monthOptions}</select> /
      <select name="todos_day[${todoIndex}]" style="width: 60px; display: inline-block;">${dayOptions}</select>
    </td>

    <td><input type="text" name="todos_comment[${todoIndex}]" style="width: 100%;"></td>
    <td><button type="button" onclick="removeRow(this)">削除</button></td>
  `;
  todoIndex++;
}

function removeRow(button) {
  const row = button.closest("tr");
  row.remove();
}

// タイムラインを生成（0:00〜23:00）
function generateTimeline() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  for (let hour = 0; hour < 24; hour++) {
    const slot = document.createElement("div");
    slot.className = "time-slot";
    slot.dataset.hour = hour;
    slot.innerHTML = `<span class="time-label">${hour}:00</span><span class="current-dot" style="display:none;">●</span>`;
    timeline.appendChild(slot);
  }
}

function updateCurrentTimeDot() {
  const now = new Date();
  const hour = now.getHours();
  const timeStr = `${String(hour).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // すべてのドットを非表示にする
  document.querySelectorAll(".current-dot").forEach(dot => dot.style.display = "none");

  // 現在時刻のスロットに●を表示
  const slot = document.querySelector(`.time-slot[data-hour='${hour}']`);
  if (slot) {
    const dot = slot.querySelector(".current-dot");
    if (dot) {
      dot.style.display = "inline";
      dot.title = `現在時刻：${timeStr}`;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  generateTimeline();
  updateCurrentTimeDot();
  setInterval(updateCurrentTimeDot, 60 * 1000);
});



