export const STORAGE_KEY = 'todos-vuejs';

export const mutations = {
  addCanvas(state, todo) {
    state.todos.push(todo);
  },

    CHANGE_COLOR_VALUE(state, colorObj){
console.log(colorObj)
        state.rgbColors = { ...state.rgbColors, [colorObj.color]: colorObj.val };
    },

  draw(canvas, red, green, blue, alpha) {
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(100, 100);
    const data = image.data;

    const length = 100 * 100 * 4;
    for (let i = 0; i < length; i += 4) {
      data[i] = red;
      data[i + 1] = green;
      data[i + 2] = blue;
      data[i + 3] = alpha;
    }

    ctx.putImageData(image, 0, 0);
  },

  removeTodo(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  editTodo(state, { todo, text = todo.text, done = todo.done }) {
    todo.text = text;
    todo.done = done;
  },
};
