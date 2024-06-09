import { ContentContainer } from "@/components/ContentContainer";
import { AdministrationActions } from "@/modules/AdministrationModule/AdministrationActions.tsx";
import { AdministrationContent } from "@/modules/AdministrationModule/AdministrationContent.tsx";
export const AdministrationModule = () => {
    return (
        <ContentContainer
            actions={<AdministrationActions/>}
        >
            <AdministrationContent/>
        </ContentContainer>
    );
};