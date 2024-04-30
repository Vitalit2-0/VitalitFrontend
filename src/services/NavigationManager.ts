class NavigationManager {
    public static navigateTo(route: string, returnUrl?: string, params?: any) {
        let url = `/VitalitFrontend/#${route}?returnUrl=${encodeURIComponent(returnUrl || "")}${params ? Object.entries(params).map(([key, value]: any) => `&${key}=${encodeURIComponent(value)}`).join("") : ""}`;
        console.log(url);
        window.location.href = url;
    }
}


export default NavigationManager;