const tasks = {
}

function run(name) {
  if (tasks[name]) {
    tasks[name]()
  } else {
    console.log('did not find task:', name)
  }
}


export { run }
