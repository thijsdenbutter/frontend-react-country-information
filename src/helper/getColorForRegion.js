function getColorForRegion(region, subregion) {
    switch (region) {
        case "Africa":
            return "blue"
        case "Americas":
            switch (subregion) {
                case "North America":
                    return "green"
                default:
                    return "light-green"
            }
        case "Asia":
            return "red"
        case "Europe":
            return "yellow"
        default:
            return "purple"
    }
}

export default getColorForRegion;