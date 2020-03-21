import ajax from './ajax'

export const getHomelessAnimals = (pageNum = 1) => ajax('animal/list', {pageNum})
//获取分页
export const getSearchAnimals = (keyword) => ajax('/animal/search', {keyword})
//获取符合检索条件的动物
export const reqDeleteImg = (names) => ajax('/img/delete', {names}, 'post')
//删除图片
export const reqAddAnimal = (animal) => ajax('/animal/add', {animal}, 'post')
//添加动物
export const reqUpdateAnimal = (animal) => ajax('/animal/update', {animal}, 'post')
//更新动物信息
export const reqAdoptAnimal = (adopter) => ajax('/adopter/adopt', {adopter}, 'post')
//创建收养人档案
export const reqAdoptRate = (_id, rate) => ajax('/adopter/rate', {_id, rate}, 'post')
//更新评分
export const reqAddComment = (content, pid, name) => ajax('/comment/add', {comment:{content, pid, name}}, 'post')
//创建评论
export const getCommentList = () => ajax('/comment/list')
//获取评论列表
export const reqUpdateComment = (comment) => ajax('/comment/update', {comment}, 'post')
//对评论进行操作
