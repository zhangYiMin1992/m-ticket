/**
 * 关键字高亮
 * @param content
 * @param term
 * @returns {*}
 */
export function highlight(content, term) {
    return content.replace(new RegExp("(?!<[^<>]*)(" +
            term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") +
            ")(?![^<>]*>)", "i"),
        "<span class='highlight'>$1</span>");
}