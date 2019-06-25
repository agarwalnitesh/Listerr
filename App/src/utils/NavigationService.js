class NavigationService {
    static navigationRef = undefined;

    setNavigationRef(navigationRef) {
        if (NavigationService.navigationRef === undefined) {
            NavigationService.navigationRef = navigationRef;
        }
    }

    getNavigationRef() {
        return NavigationService.navigationRef;
    }
}

export default NavigationService;