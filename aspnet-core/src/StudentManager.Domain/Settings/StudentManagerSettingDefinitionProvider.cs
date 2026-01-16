using Volo.Abp.Settings;

namespace StudentManager.Settings;

public class StudentManagerSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(StudentManagerSettings.MySetting1));
    }
}
