'use strict';

{
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };


    //todo自体を配列に、ここの配列はtitleとcheckの有無をobjectに
    // const todos = [
    //     { title: 'aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa', isCompleted: false },
    //     { title: 'bbb', isCompleted: true },
    //     { title: 'ccc', isCompleted: false },
    //     { title: 'ddd', isCompleted: false },
    // ];

    const renderTodo = (todo) => {
        /*
        li
            -label
                -input
                -span
            -button
        */
        const input = document.createElement('input');
        // inputオブジェクトに対するtypeプロパティで属性の指定ができる
        input.type = 'checkbox';
        // inputオブジェクトに対するcheckedプロパティでcheckの有無を設定できる
        input.checked = todo.isCompleted;

        const span = document.createElement('span');
        span.textContent = todo.title;

        const label = document.createElement('label');

        // labelの子要素にinputとspanを設定
        label.appendChild(input);
        label.appendChild(span);

        const button = document.createElement('button');
        button.textContent = 'X';
        button.addEventListener('click', () => {
            if (!confirm('Sure?')) { //!をつけることでfalse時に実行されるif文となる
                return;
            };
            // ボタン押下時、li要素(todo)ごと削除
            li.remove();
            // 配列todosからidが合致するもの"以外"を抜き出して配列にし、todosに再代入する
            todos = todos.filter((item)=>{
                return item.id !== todo.id;
            });
            localStorage.setItem('todos', JSON.stringify(todos));

        })

        const li = document.createElement('li');
        li.appendChild(label);
        li.appendChild(button);

        document.querySelector('#todos').appendChild(li);

    };


    const renderTodos = () => {
        todos.forEach((todo) => {
            renderTodo(todo);
        });
    };

    document.querySelector('#add-form').addEventListener('submit', (e) => {
        // formをsubmitしてしまうとデフォルトでリロードされてしまうため、preventDefault()で打ち消し
        e.preventDefault();
        const input = document.querySelector('#add-form input');
        const todo = {
            id: Date.now(),
            // フォーム内のvalue要素をtodoオブジェクトのtitleプロパティに
            title: input.value,
            isCompleted: false,
        };
        renderTodo(todo);
        // 配列todosに新規作成したtodoをpush
        todos.push(todo);
        console.table(todos);
        // localStorageを更新
        localStorage.setItem('todos', JSON.stringify(todo));
        input.value = '';
        input.focus();

    });

    renderTodos();

    // setItemに保存できるのは文字列のみ、配列の場合はJSON.stringifyでJSON形式に変換
    localStorage.setItem('todos', JSON.stringify(todos));
    // keyに紐づいた値を取得する際はJSON.parseで元の配列に戻す
    console.log(JSON.parse(localStorage.getItem('todos')));
}