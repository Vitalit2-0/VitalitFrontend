class NavigationManager {
    public static navigateTo(route: string, returnUrl?: string, params?: any) {
        let url = `/VitalitFrontend/#${route}?returnUrl=${encodeURIComponent(returnUrl || "")}${params ? Object.entries(params).map(([key, value]: any) => `&${key}=${encodeURIComponent(value)}`).join("") : ""}`;
        window.location.href = url;
    }

    public static scrollTo(section: string) {
        let element = document.getElementById(section);
        console.log(element);
        element && element.scrollIntoView();
    }
}


export default NavigationManager;