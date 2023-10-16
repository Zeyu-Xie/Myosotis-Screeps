const content = {
    politics: ["富强民主文明和谐", "自由平等公正法治", "爱国敬业诚信友善", "君君臣臣父父子子", "拜登坏事做尽", "美国坏事做尽", "唉，美国", "唉，资本", "唉，犹太", "唉，昂撒", "民族强大人民幸福", "为人民服务", "艰苦奋斗", "楼上的下来做核酸", "上下齐心抓间谍", "美帝亡我之心不死", "万岁万岁万万岁"],
    mood: ["加班快乐", "SB 老板", "原神，启动！", "脸都不要了", "666", "鸡你太美 🏀"]
}

var slogan = function (type, probability) {
    return ""
    if (Math.random() > probability) return ""
    switch (type) {
        case "POLITICS": return content.politics[Math.floor(Math.random() * (content.politics.length))]
        case "MOOD": return content.mood[Math.floor(Math.random() * (content.mood.length))]
        default: return ""
    }
}

module.exports = slogan