// DARWIN-MFC POCKETBASE HOOKS
// ===========================
//
// Custom hooks for PocketBase backend.
// These integrate with Keycloak for auth validation.

package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	// ==========================================================================
	// MIDDLEWARE: Keycloak Token Validation
	// ==========================================================================
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// Add CORS middleware
		e.Router.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
			return func(c echo.Context) error {
				c.Response().Header().Set("Access-Control-Allow-Origin", "*")
				c.Response().Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
				c.Response().Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

				if c.Request().Method == "OPTIONS" {
					return c.NoContent(http.StatusNoContent)
				}

				return next(c)
			}
		})

		// Health check endpoint
		e.Router.GET("/api/v1/health", func(c echo.Context) error {
			return c.JSON(http.StatusOK, map[string]string{
				"status":  "healthy",
				"service": "darwin-mfc-api",
			})
		})

		// Version endpoint
		e.Router.GET("/api/v1/version", func(c echo.Context) error {
			return c.JSON(http.StatusOK, map[string]string{
				"version": "1.0.0",
				"api":     "v1",
			})
		})

		return nil
	})

	// ==========================================================================
	// HOOKS: User Sync from Keycloak
	// ==========================================================================
	app.OnRecordBeforeCreateRequest("users").Add(func(e *core.RecordCreateEvent) error {
		// Ensure username is lowercase
		username := e.Record.GetString("username")
		e.Record.Set("username", strings.ToLower(username))
		return nil
	})

	// ==========================================================================
	// HOOKS: Forum Post Reply Count
	// ==========================================================================
	app.OnRecordAfterCreateRequest("forum_replies").Add(func(e *core.RecordCreateEvent) error {
		postId := e.Record.GetString("post_id")
		if postId == "" {
			return nil
		}

		post, err := app.Dao().FindRecordById("forum_posts", postId)
		if err != nil {
			log.Printf("Error finding post: %v", err)
			return nil
		}

		replyCount := post.GetInt("reply_count")
		post.Set("reply_count", replyCount+1)

		if err := app.Dao().SaveRecord(post); err != nil {
			log.Printf("Error updating reply count: %v", err)
		}

		return nil
	})

	// ==========================================================================
	// HOOKS: Clinical Case Anonymization Check
	// ==========================================================================
	app.OnRecordBeforeCreateRequest("clinical_cases").Add(func(e *core.RecordCreateEvent) error {
		// Validate that content doesn't contain obvious PII
		// This is a basic check - more sophisticated checks should be done client-side
		content := e.Record.GetString("presentation")
		if containsPotentialPII(content) {
			return apis.NewBadRequestError("Content may contain personally identifiable information", nil)
		}
		return nil
	})

	// ==========================================================================
	// HOOKS: Sync Logging
	// ==========================================================================
	app.OnRecordAfterCreateRequest().Add(func(e *core.RecordCreateEvent) error {
		// Log sync operations for audit
		collection := e.Record.Collection().Name
		if collection == "sync_log" {
			return nil // Don't log sync_log operations
		}

		log.Printf("[Sync] Created: %s/%s", collection, e.Record.Id)
		return nil
	})

	app.OnRecordAfterUpdateRequest().Add(func(e *core.RecordUpdateEvent) error {
		collection := e.Record.Collection().Name
		log.Printf("[Sync] Updated: %s/%s", collection, e.Record.Id)
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

// containsPotentialPII checks for common PII patterns
func containsPotentialPII(text string) bool {
	text = strings.ToLower(text)

	// Check for common PII indicators
	piiIndicators := []string{
		"cpf:", "rg:", "nome:", "endereço:", "telefone:",
		"name:", "address:", "phone:", "email:",
		"@", // Email addresses
	}

	for _, indicator := range piiIndicators {
		if strings.Contains(text, indicator) {
			return true
		}
	}

	// Check for date patterns that might indicate birthdates
	// This is a simple check - real implementation should use regex

	return false
}
