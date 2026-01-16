using Microsoft.Extensions.Localization;
using StudentManager.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace StudentManager;

[Dependency(ReplaceServices = true)]
public class StudentManagerBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<StudentManagerResource> _localizer;

    public StudentManagerBrandingProvider(IStringLocalizer<StudentManagerResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
