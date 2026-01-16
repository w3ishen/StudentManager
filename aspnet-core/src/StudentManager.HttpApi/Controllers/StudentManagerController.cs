using StudentManager.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace StudentManager.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class StudentManagerController : AbpControllerBase
{
    protected StudentManagerController()
    {
        LocalizationResource = typeof(StudentManagerResource);
    }
}
