export default function(instance) {
    return {
        page(page = 1) {
            return instance.get('music?page=' + page)
        },
        search(page = 1, value) {
            const pageStr = 'music?page=' + page
            const valueStr = '&searchValue=' + value
            return instance.get(pageStr + valueStr)
        },
        music(id) {
            return instance.get('music/' + id)
        }
    }
}