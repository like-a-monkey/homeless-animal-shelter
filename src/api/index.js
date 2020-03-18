import ajax from './ajax'

export const getHomelessAnimals = (pageNum = 1) => ajax('animal/list', {pageNum})
//获取分页
export const getSearchAnimals = (keyword) => ajax('/animal/search', {keyword})
//获取符合检索条件的动物
export const reqDeleteImg = (name) => ajax('/img/delete', {name}, 'post')
//删除图片
export const reqAddAnimal = (animal) => ajax('/animal/add', {animal}, 'post')
//添加动物
export const reqUpdateAnimal = (animal) => ajax('/animal/update', {animal}, 'post')
//更新动物信息
export const reqAdoptAnimal = (adopter) => ajax('/adopter/adopt', {adopter}, 'post')