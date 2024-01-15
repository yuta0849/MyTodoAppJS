'use strict';

{
    //todo自体を配列に、ここの配列はtitleとcheckの有無をobjectに
    const todos = [
        { title: 'aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa', isCompleted: false },
        { title: 'bbb', isCompleted: true },
        { title: 'ccc', isCompleted: false },
        { title: 'ddd', isCompleted: false },
    ];

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
        const todo = {
            // フォーム内のvalue要素をtodoオブジェクトのtitleプロパティに
            title: document.querySelector('#add-form input').value,
            isCompleted: false,
        };
        renderTodo(todo);
    });

    renderTodos();
}