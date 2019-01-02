workflow "IIIF Redux" {
  on = "push"
  resolves = ["Yarn tests"]
}

action "Yarn install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Yarn tests" {
  uses = "borales/actions-yarn@master"
  args = "test"
  needs = ["Yarn install"]
}
