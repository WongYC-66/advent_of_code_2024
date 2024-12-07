const dfs = i => {
    console.log(i)
    dfs(i + 1)
}
dfs(1)
