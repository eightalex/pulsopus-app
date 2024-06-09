import { ContentContainer } from "@/components/ContentContainer";
import { AdministrationActions } from "@/modules/AdministrationModule/AdministrationActions.tsx";
export const AdministrationModule = () => {
    return (
        <ContentContainer
            actions={<AdministrationActions/>}
        >
            <div>content</div>
        </ContentContainer>
    );
};