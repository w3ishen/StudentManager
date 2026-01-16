using System;
using System.Collections.Generic;
using System.Text;
using StudentManager.Localization;
using Volo.Abp.Application.Services;

namespace StudentManager;

/* Inherit your application services from this class.
 */
public abstract class StudentManagerAppService : ApplicationService
{
    protected StudentManagerAppService()
    {
        LocalizationResource = typeof(StudentManagerResource);
    }
}
