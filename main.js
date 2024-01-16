'use strict';

{
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }


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
        // check時はclickではなくchange
        input.addEventListener('change', () => {
            todos.forEach((item) => {
                if (item.id === todo.id) {
                    //isCompetedプロパティを反転
                    item.isCompleted = !item.isCompleted;
                }
                saveTodos();
            });
        });
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
            // ボタン押下時、li要素(todo)ごと削除、下記のliは定数
            li.remove();
            // 配列todosからidが合致するもの"以外"を抜き出して配列にし、todosに再代入する
            todos = todos.filter((item) => {
                return item.id !== todo.id;
            });
            saveTodos();

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
        saveTodos();
        input.value = '';
        input.focus();

    });

    document.querySelector('#purge').addEventListener('click', () => {
        if (!confirm('Sure?')) { 
            return;
        };
        todos = todos.filter((todo) => {
            return todo.isCompleted === false;
        });
        saveTodos();
        //一度全てのli要素を削除
        document.querySelectorAll('#todos li').forEach((li) => {
            li.remove();
        });
        renderTodos();
    });

    //再度配列todosを参照してli要素を作成
    renderTodos();
}